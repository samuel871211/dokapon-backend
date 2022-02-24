import express from 'express'
import { gameArchive } from '../controllers/gameArchive'
import { body } from 'express-validator'
const controller = new gameArchive(1, 2)
const gameArchiveRouter = express.Router()
gameArchiveRouter.get('/', controller.get)
gameArchiveRouter.get('/backup/:slotIdx', controller.findBackup)
gameArchiveRouter.get('/:slotIdx', controller.find)
gameArchiveRouter.put('/:slotIdx', controller.put)
gameArchiveRouter.post('/', body(['username']).isEmail() , controller.post)

export default gameArchiveRouter