import type { RequestHandler } from 'express'
import createHttpError from 'http-errors'

export const requiresAuth: RequestHandler = (req, res, next) => {
	/* @ts-expect-error request sessions */
	if (req.session.userId !== null) {
		next()
	} else {
		next(createHttpError(401, 'User not authenticated'))
	}
}
