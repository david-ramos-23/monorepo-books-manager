import { Router } from 'express'
import {
	deleteBook,
	getBook,
	getBooks,
	saveBook,
	updateBook,
} from '../controllers/books'

const router: Router = Router()

router.get('/', getBooks)

router.get('/:bookId', getBook)

router.post('/', saveBook)

router.patch('/:bookId', updateBook)

router.delete('/:bookId', deleteBook)

export default router
