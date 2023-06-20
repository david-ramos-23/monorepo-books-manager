import env from './utils/validateEnv'

export const DB_URL =
	`mongodb+srv://${env.USERNAME}:${env.PASSWORD}@product-softwareenginee.ep8fl.mongodb.net/${env.DB_NAME}?retryWrites=true&w=majority` ??
	'mongodb://localhost:27017'
export const PORT = env.PORT
