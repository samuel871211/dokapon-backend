import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import graphRouter from './src/routes/graph'

dotenv.config()
const app = express()
app.use(express.json({ limit: '10mb' }))
app.use(cors())
app.use('/imgs', express.static(`${__dirname}/src/static/imgs`, { maxAge: 31536000 }))
app.use('/graph', graphRouter)
app.get('/', (req, res) => res.send('welcome to dokapon API Service'))
app.listen(process.env.PORT)

export default app