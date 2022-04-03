import { Request, Response } from 'express'
import { MongoClient } from 'mongodb'
import config from '../../config'

class Graph {
	async get (req: Request, res: Response) {
		try {
			const db = await MongoClient.connect(config.dbUrl)
			const data = await db.db(config.dbName).collection('graph').find().toArray()
			if (data.length === 0) res.status(404).send()
			else res.send(data)
		} catch (e) {
			console.log(e)
			res.status(500).send()
		}
	}
	async find (req: Request, res: Response) {
		try {
			const db = await MongoClient.connect(config.dbUrl)
			const query = { name: req.params.name }
			const data = await db.db(config.dbName).collection('graph').findOne(query)
			if (!data) res.status(404).send()
			else res.send(data)
		} catch (e) {
			console.log(e)
			res.status(500).send()
		}
	}

	async put (req: Request, res: Response) {
		try {
			console.log(req.params.name, req.body)
			const db = await MongoClient.connect(config.dbUrl)
			const query = { name: req.params.name }
			const update = { $set: { cells: req.body.cells } }
			const result = await db.db(config.dbName).collection('graph').updateOne(query, update)
			res.send(result)
		} catch (e) {
			console.log(e)
			res.status(500).send()
		}
	}

	async post (req: Request, res: Response) {
		try {
			const db = await MongoClient.connect(config.dbUrl)
			const newData = {
				name: req.params.name,
				cells: []
			}
			const checkData = { name: req.params.name }
			const IsDuplicateName = await db.db(config.dbName).collection('graph').findOne(checkData)
			if (IsDuplicateName) return (res.status(400).send())

			const result = await db.db(config.dbName).collection('graph').insertOne(newData)
			// newData 此時多了 _id的欄位
			if (result.acknowledged) res.status(200).send(newData)
			else res.status(500).send()
		} catch (e) {
			console.log(e)
			res.status(500).send()
		} 
	}
}

export default new Graph()