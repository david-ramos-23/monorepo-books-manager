import { config } from 'dotenv'
import { cleanEnv } from 'envalid'
import { port, str } from 'envalid/dist/validators'

config()

export default cleanEnv(process.env, {
	USERNAME: str(),
	PASSWORD: str(),
	DB_NAME: str(),
	PORT: port({ default: 3000 }),
})
