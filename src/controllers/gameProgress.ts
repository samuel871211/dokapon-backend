import { Request, Response } from 'express'
import { GOALS, GENDERS, COLORS, JOBS, NPCLEVELS } from '../utils/constants'
import { validationResult, checkSchema, Meta } from 'express-validator'
import { get } from 'lodash'
import { MongoClient } from 'mongodb'
import config from '../../config'

class gameProgress {
    async get (req: Request, res: Response) {
	}
    async find (req: Request, res: Response) {
	}
    async findBackup (req: Request, res: Response) {
	}
    async put (req: Request, res: Response) {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            res.status(500).send(error)
            return
        }

        const slotIdx = req.params.slotIdx
        const gameProgress = req.body
        try {
			const client = await MongoClient.connect(config.dbUrl)
			const data = await client.db(config.dbName).collection('user').updateOne(
                { slotIdx },
                { $set: gameProgress }
            )
			res.send(data)
		} catch (e: unknown) {
            console.log(e)
			res.status(500).send()
		}
	}
}

const checkGameProgressSchema = checkSchema({
    slotIdx: { isInt: { options: { min: 0, max: 9 } }, in: 'params' },
    timeStamp: { isISO8601: true },
    goalType: { toLowerCase: true, isIn: { options: [GOALS] } },
    goalInput: { custom: { options: checkIsValidGoalInput } },
    numberOfPlayers: { isInt: { options: { min: 1, max: 4 } } },
    currentPlayer: { isInt: { options: { min: 1, max: 4 } } },
    playersAttrs: { isArray: { options: { min: 4, max: 4 } } },
    'playersAttrs.*.gender': { isIn: { options: [GENDERS] } },
    'playersAttrs.*.name': { isString: true, isLength: { options: { min: 1, max: 8 } } },
    'playersAttrs.*.color': { isIn: { options: [COLORS] } },
    'playersAttrs.*.job': { isIn: { options: [JOBS] } },
    'playersAttrs.*.isNPC': { isBoolean: true },
    'playersAttrs.*.npcLevel': { custom: { options: checkIsValidNpcLevel } },
    'playersAttrs.*.controllerNumber': { custom: { options: checkIsValidControllerNumber } }
}, ['body'])

function checkIsValidGoalInput (input: any, meta: Meta) {
    const goalType = meta.req.body.goalType
    switch (goalType) {
    case 'period':
        return (input >= 1 && input <= 999)
    case 'money':
        return (input >= 1 && input <= 999999999)
    default:
        return true
    }
}

function checkIsValidNpcLevel (input: any, meta: Meta) {
    // meta.path = playersAttrs[x].npcLevel; where x is from 0 ~ 3
    const isNPC = get(meta.req.body, meta.path.replace('npcLevel', 'isNPC'))
    return isNPC ? NPCLEVELS.includes(input) : input === ''
}

function checkIsValidControllerNumber (input: any, meta: Meta) {
    // meta.path = playersAttrs[x].controllerNumber; where x is from 0 ~ 3
    const isNPC = get(meta.req.body, meta.path.replace('controllerNumber', 'isNPC'))
    return isNPC ? input === 0 : (input >= 1 && input <= 4)
}

export { checkGameProgressSchema }
export default new gameProgress()