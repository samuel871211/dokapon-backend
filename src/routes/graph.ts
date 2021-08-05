// const graphController = require('./controllers/graph')
// const express = require('express')
import Graph from '../controllers/graph'
import express from 'express'
const graphRouter = express.Router()

graphRouter.get('/graph', Graph.get)
graphRouter.put('/graph', Graph.put)

export default graphRouter
// module.exports = graphRouter
