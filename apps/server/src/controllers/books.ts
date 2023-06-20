import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import { BookType } from '../models/book'
import { v4 } from 'uuid'

let books: BookType[] = []

export const getBooks: RequestHandler = async (req, res, next) => {
	/* @ts-expect-error request sessions */
	const { userId: authenticatedUserId } = req.session

	try {
		const userBooks = books.filter(
			(book) => book.userId === authenticatedUserId
		)

		res.status(200).json(userBooks)
	} catch (error) {
		next(error)
	}
}

export const getBook: RequestHandler = async (req, res, next) => {
	const bookId = req.params.bookId
	/* @ts-expect-error request sessions */
	const { userId: authenticatedUserId } = req.session

	try {
		const book = books.find((book) => book.id === bookId)

		if (book == null) {
			throw createHttpError(404, 'Book not found')
		}

		if (book.userId !== authenticatedUserId) {
			throw createHttpError(401, 'You cannot access this Book')
		}

		res.status(200).json(book)
	} catch (error) {
		next(error)
	}
}

interface SaveBookBody {
	author: string
	description: string
	image: string
	title: string
}

export const saveBook: RequestHandler<
	unknown,
	unknown,
	SaveBookBody,
	unknown
> = async (req, res, next) => {
	const { author, description, image, title } = req.body
	/* @ts-expect-error request sessions */
	const { userId: authenticatedUserId } = req.session

	try {
		if (title === '') {
			throw createHttpError(400, 'Book must have a title')
		}

		const existingBookTitle = books.find((book) => book.title === title)

		if (existingBookTitle != null) {
			throw createHttpError(
				409,
				`The book ${title} is already saved. Please choose a different title or update the existing book.`
			)
		}

		const newBook: BookType = {
			id: v4(),
			author,
			description,
			image,
			title,
			userId: authenticatedUserId,
		}

		books.push(newBook)

		res.status(201).json(newBook)
	} catch (error) {
		next(error)
	}
}

interface UpdateBookParams {
	bookId: string
}

export const updateBook: RequestHandler<
	UpdateBookParams,
	unknown,
	Partial<SaveBookBody>,
	unknown
> = async (req, res, next) => {
	const { bookId } = req.params
	const updatedBook = req.body

	try {
		if (updatedBook === undefined) {
			throw createHttpError(400, 'Book is empty')
		}

		const updatedBooks = books.map((book) =>
			book.id === bookId
				? {
						...book,
						...updatedBook,
				  }
				: book
		)

		books = updatedBooks
		res.status(200).json(updatedBooks)
	} catch (error) {
		next(error)
	}
}

export const deleteBook: RequestHandler = async (req, res, next) => {
	const { bookId } = req.params
	/* @ts-expect-error request sessions */
	const { userId: authenticatedUserId } = req.session

	try {
		const book = books.find((book) => book.id === bookId)

		if (book == null) {
			throw createHttpError(404, 'Book not found')
		}

		if (book.userId !== authenticatedUserId) {
			throw createHttpError(401, 'You cannot access this Book')
		}

		const filteredBooks = books.filter((book) => book.id !== req.params.id)

		books = filteredBooks
		res.status(200).json({ message: 'Book deleted' })
	} catch (error) {
		next(error)
	}
}
