import Graph from '../controllers/graph'
import express from 'express'
const graphRouter = express.Router()

graphRouter.get('/', Graph.get)
// graphRouter.put('/', Graph.put)

export default graphRouter
