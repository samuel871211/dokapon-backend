import Graph from '../controllers/graph'
import express from 'express'
const graphRouter = express.Router()

graphRouter.get('/', Graph.get)
graphRouter.get('/:name', Graph.find)
graphRouter.put('/:name', Graph.put)
graphRouter.post('/:name', Graph.post)

export default graphRouter
