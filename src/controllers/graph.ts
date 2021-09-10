import { MongoClient } from 'mongodb'
import { Request, Response } from 'express'
import dotenv from 'dotenv'
dotenv.config()
const mongoUrl = process.env.MONGO_URL || ''
const dbName = process.env.MONGO_DBNAME || ''

class Graph {
	async get (req: Request, res: Response) {
		try {
			const db = await MongoClient.connect(mongoUrl)
			const data = await db.db(dbName).collection('graph').findOne(
				{ title: 'world' },
				{ projection: { _id: 0, title: 0 } }
			)
			res.send(data)
		} catch (e) {
			console.log(e)
			res.status(500).send({ cells: [] })
		}
	}

	async put (req: Request, res: Response) {
		try {
			const db = await MongoClient.connect(mongoUrl)
			await db.db(dbName).collection('graph').updateOne(
				{ title: 'world' },
				{ $set: req.body }
			)
			res.send(req.body)
		} catch (e) {
			console.log(e)
			res.status(500).send()
		}
	}
}

export default new Graph()
// module.exports = new Graph()