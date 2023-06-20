import app from './app'
import { PORT } from './config'
import { dbConnect } from './db'

async function main() {
	await app.listen(PORT)
	console.log('Server on port', PORT)
	await dbConnect()
}

void main()
