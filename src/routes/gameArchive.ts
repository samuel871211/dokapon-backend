import express from 'express'
import gameArchive from '../controllers/gameArchive'
const gameArchiveRouter = express.Router()

gameArchiveRouter.get('/', gameArchive.get)
gameArchiveRouter.put('/', gameArchive.put)
gameArchiveRouter.post('/', gameArchive.tempUserSelect)

export default gameArchiveRouter