import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import graphRouter from './src/routes/graph'
// const express = require('express')
// const cors = require('cors')
// const dotenv = require('dotenv')
// const graphRouter = require('./src/routes/graph')
// "start": "node --loader ts-node/esm ./index.ts",

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())
app.use('/', graphRouter)
app.get('/', (req, res) => res.send('welcome to dokapon API Service'))
app.listen(process.env.PORT)

export default app