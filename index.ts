import express, { Request, Response, NextFunction} from 'express'
import cors from 'cors'
import { PORT } from './config'
import graphRouter from './src/routes/graph'
import gameProgressRouter from './src/routes/gameProgress'
import userPreferenceRouter from './src/routes/userPreference'

const app = express()
app.use(express.json({ limit: '10mb' }))
app.use(cors())
app.use('/imgs', express.static(`${__dirname}/src/static/imgs`, { maxAge: 31536000 }))
app.use('/graph', graphRouter)
app.use('/gameProgress', gameProgressRouter)
app.use('/userPreference', userPreferenceRouter)
app.get('/', (req: Request, res: Response, next: NextFunction) => res.send('welcome to dokapon API Service'))
app.listen(PORT)

export default app