import { MongoClient } from 'mongodb'
import { Request, Response } from 'express'
import dotenv from 'dotenv'
// const MongoClient = require('mongodb').MongoClient
// const express = require('express')
// const dotenv = require('dotenv')
dotenv.config()
const mongoUrl = process.env.MONGO_URL || ''
const dbName = process.env.MONGO_DBNAME || ''

class Graph {
	async get (req: Request, res: Response) {
		const db = await MongoClient.connect(mongoUrl)
		const data = await db.db(dbName).collection('graph').findOne(
			{ title: 'world' },
			{ projection: { _id: 0, title: 0 } }
		)
		res.send(data)
	}

	async put (req: Request, res: Response) {
		const db = await MongoClient.connect(mongoUrl)
		await db.db(dbName).collection('graph').updateOne(
			{ title: 'world' },
			{ $set: req.body }
		)
		res.send(req.body)
	}
}

export default new Graph()
// module.exports = new Graph()