import { Request, Response, NextFunction } from 'express'
import { MongoClient } from 'mongodb'
import { validationResult, checkSchema } from 'express-validator'
import { LANGS, ASPECTRATIOS } from '../utils/constants'
import  config from '../../config'

class UserPreference {
    async get (req: Request, res: Response, next: NextFunction) {
        const userId = req.params.userId
    	try {
			const client = await MongoClient.connect(config.dbUrl)
			const data = await client.db(config.dbName).collection('user').findOne({ userId })
            if (!data) return (res.status(404).send())
			res.send(data)
		} catch (e: unknown) {
            console.log(e)
			res.status(500).send()
		}
    }
    async put (req: Request, res: Response, next: NextFunction) {
        const error = validationResult(req)
        if (!error.isEmpty()) return (res.status(400).send(error))

        const userId = req.params.userId
        const userPreference = req.body
    	try {
			const client = await MongoClient.connect(config.dbUrl)
			const data = await client.db(config.dbName).collection('userPreference').updateOne(
                { userId },
                { $set: userPreference }
            )
			res.send(data)
		} catch (e: unknown) {
            console.log(e)
			res.status(500).send()
		}
    }
}

const checkUserPreferenceSchema = checkSchema({
    arrowUp: { isString: true },
    arrowDown: { isString: true },
    arrowLeft: { isString: true },
    arrowRight: { isString: true },
    triangle: { isString: true },
    circle: { isString: true },
    square: { isString: true },
    cross: { isString: true },
    L1: { isString: true },
    L2: { isString: true },
    R1: { isString: true },
    R2: { isString: true },
    SELECT: { isString: true },
    ANALOG: { isString: true },
    START: { isString: true },
    lang: { toLowerCase: true, isIn: { options: [LANGS] } },
    aspectRatio: { toLowerCase:true, isIn: { options: [ASPECTRATIOS] } },
    userId: { isUUID: true, in: 'params' }
}, ['body'])

export { checkUserPreferenceSchema }
export default new UserPreference()