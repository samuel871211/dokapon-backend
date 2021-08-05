import { MongoClient } from 'mongodb'
import { Request, Response } from 'express'
import dotenv from 'dotenv'
// const MongoClient = require('mongodb').MongoClient
// const express = require('express')
// const dotenv = require('dotenv')
dotenv.config()

class Graph {
	async get (req: Request, res: Response) {
		// const db = await MongoClient.connect('')
		// const data = await db.db('').collection('graph').findOne(
		// 	{ title: 'world' },
		// 	{ projection: { _id: 0, title: 0 } }
		// )
		// res.send(data)
		res.send('hello')
	}

	async put (req: Request, res: Response) {
		console.log(req.body)
		// const db = await MongoClient.connect('')
		// await db.db('').collection('graph').updateOne(
		// 	{ title: 'world' },
		// 	{ $set: req.body }
		// )
		res.send({})
	}
}

export default new Graph()
// module.exports = new Graph()