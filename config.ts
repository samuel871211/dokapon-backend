import dotenv from 'dotenv'
dotenv.config()
const config = {
    port: process.env.PORT || '',
    dbUrl: process.env.MONGO_URL || '',
    dbName: process.env.MONGO_DBNAME || '',
    dbPort: process.env.MONGO_PORT || '',
    dbUser: process.env.MONGO_USER || '',
    dbPassword: process.env.MONGO_PASSWORD || ''
}

export default config
// export const PORT = process.env.PORT || ''
// export const MONGO_URL = process.env.MONGO_URL || ''
// export const MONGO_DBNAME = process.env.MONGO_DBNAME || ''
// export const MONGO_PORT = process.env.MONGO_PORT || ''
// export const MONGO_USER = process.env.MONGO_USER || ''
// export const MONGO_PASSWORD = process.env.MONGO_PASSWORD || ''