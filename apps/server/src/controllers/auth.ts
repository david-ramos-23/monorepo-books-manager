import { RequestHandler } from 'express'
import { v4 } from 'uuid'
import fs from 'fs'
import type { UserType } from '../models/user'
import createHttpError from 'http-errors'
import bcrypt from 'bcrypt'
import { LoginSchemaType, SignupSchemaType } from '../schemas/auth'

const usersJson = fs.readFileSync('src/users.json', 'utf-8')
const users: UserType[] = JSON.parse(usersJson)

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
	try {
		const user = users.find((user) => user.id !== req.session.id)
		res.status(200).json(user)
	} catch (error) {
		next(error)
	}
}

export const signUp: RequestHandler<
	unknown,
	unknown,
	SignupSchemaType,
	unknown
> = async (req, res, next) => {
	const { username, email, password: passwordRaw } = req.body

	try {
		// if (!username || !email || !passwordRaw) {
		// 	throw createHttpError(400, 'Parameters missing')
		// }

		const existingUsername = users.find((user) => user.username === username)

		if (existingUsername != null) {
			throw createHttpError(
				409,
				'Username already taken. Please choose a different one or log in instead.'
			)
		}

		const existingEmail = users.find((user) => user.email === email)

		if (existingEmail != null) {
			throw createHttpError(
				409,
				'A user with this email address already exists. Please log in instead.'
			)
		}

		const passwordHashed = await bcrypt.hash(passwordRaw, 10)

		const newUser = {
			id: v4(),
			username,
			email,
			password: passwordHashed,
		}

		users.push(newUser)

		const usersJson = JSON.stringify(users)
		fs.writeFileSync('src/users.json', usersJson, 'utf-8')

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		/* @ts-expect-error */
		req.session.userId = newUser.id

		res.status(201).json(newUser)
	} catch (error) {
		next(error)
	}
}

export const login: RequestHandler<
	unknown,
	unknown,
	LoginSchemaType,
	unknown
> = async (req, res, next) => {
	const { email, password } = req.body

	try {
		// if (!email || !password) {
		// 	throw createHttpError(400, 'Parameters missing')
		// }

		const user = users.find((user) => user.email === email)

		if (user == null) {
			throw createHttpError(404, 'User not found')
		}

		const passwordMatch = await bcrypt.compare(password, user.password)

		if (!passwordMatch) {
			throw createHttpError(401, 'Invalid password')
		}

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		/* @ts-expect-error */
		req.session.userId = user.id
		res.status(201).json(user)
	} catch (error) {
		next(error)
	}
}

export const logout: RequestHandler = (req, res, next) => {
	req.session.destroy((error) => {
		if (error !== null && Boolean(error)) {
			next(error)
		} else {
			res.status(201).json({ message: 'User logged out' })
		}
	})
}
