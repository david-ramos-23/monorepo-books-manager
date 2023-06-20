import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import booksRoutes from './routes/books'
import userRoutes from './routes/users'
import session from 'express-session'
import { requiresAuth } from './middleware/auth'

const app: ReturnType<typeof express> = express()

// Middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(
	session({
		secret: 'unsafe secret',
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 60 * 60 * 1000,
		},
		rolling: true,
	})
)

// Routes
app.use('/api/users', userRoutes)
app.use('/api/books', requiresAuth, booksRoutes)

async function serveClient() {
	const path = await import('path')
	app.use(express.static(path.join(__dirname, '..', '..', 'client', 'dist')))

	app.get('*', (req, res) => {
		console.log(
			path.resolve(__dirname, '..', '..', 'client', 'dist', 'index.html')
		)
		res.sendFile(
			path.resolve(__dirname, '..', '..', 'client', 'dist', 'index.html')
		)
	})
	return path
}

if (process.env.NODE_ENV === 'production') {
	void serveClient()
}

export default app
