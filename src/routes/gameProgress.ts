import express from 'express'
import gameProgress, { checkGameProgressSchema } from '../controllers/gameProgress'
const gameProgressRouter = express.Router()
gameProgressRouter.get('/', gameProgress.get)
gameProgressRouter.get('/backup/:slotIdx', gameProgress.findBackup)
gameProgressRouter.get('/:slotIdx', gameProgress.find)
gameProgressRouter.put('/:slotIdx', checkGameProgressSchema, gameProgress.put)

export default gameProgressRouter