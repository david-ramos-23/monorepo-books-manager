import { Router } from 'express'
import { requiresAuth } from '../middleware/auth'
import {
	getAuthenticatedUser,
	login,
	logout,
	signUp,
} from '../controllers/auth'
import { schemaValidator } from '../middleware/schemaValidator'
import { signUpSchema, loginSchema } from '../schemas/auth'

const router: Router = Router()

router.get('/', requiresAuth, getAuthenticatedUser)

router.post('/signup', schemaValidator(signUpSchema), signUp)

router.post('/login', schemaValidator(loginSchema), login)

router.post('/logout', logout)
export default router
