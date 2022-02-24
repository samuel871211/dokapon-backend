import { Request, Response } from 'express'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { validationResult } from 'express-validator'
const dir = __dirname.replace('controllers', 'gameArchives')
/**
 * 遊戲存檔的類別
 */
export class gameArchive {
    /**
     * 建構子的參數介紹
     * @param param1 暫時沒任何意義
     * @param param2 還是沒任何意義
     */
    constructor (param1: number, param2: number) {
        //
    }
    /**
     * get all game archives (slot0 ~ slot9)
     * @param req express Request Object
     * @param res express Response Object
     */
    get (req: Request, res: Response): void {
        const result: object[] = []
        for (let i = 0; i <= 9; i++) {
            let filePath = `${dir}/slot${i}.json`
            if (!existsSync(filePath)) {
                result[i] = { timeStamp: '空的' }
            } else {
                const buffer = readFileSync(filePath)
                const data = JSON.parse(buffer.toString())
                result[i] = data
            }
        }
		res.send(result)
	}
    /**
     * get the game archive of index-th slot
     * @param req express Request Object
     * @param res express Response Object
     */
    find (req: Request, res: Response): void {
		const filePath = `${dir}/slot${req.params.slotIdx}.json`
		if (!existsSync(filePath)) {
			res.status(404).send()
			return
		}
		const buffer = readFileSync(`${dir}/slot${req.params.slotIdx}.json`)
		const result = JSON.parse(buffer.toString())
		res.send(result)
	}
    /**
     * get the game archive backup of index-th slot
     * @param req express Request Object
     * @param res express Response Object
     */
    findBackup (req: Request, res: Response): void {
		const filePath = `${dir}/slot${req.params.slotIdx}.backup.json`
		if (!existsSync(filePath)) {
			res.status(404).send()
			return
		}
		const buffer = readFileSync(filePath)
		const result = JSON.parse(buffer.toString())
		res.send(result)
	}
    /**
     * update the game archive of index-th slot and create backup if exist,
     * else create a new game archive
     * @TODO req.body 資料檢查
     * @param req express Request Object
     * @param res express Response Object
     */
    put (req: Request, res: Response): void {
        const filePath = `${dir}/slot${req.params.slotIdx}.json`
        if (existsSync(filePath)) {
            const buffer = readFileSync(filePath)
            const backupData = JSON.parse(buffer.toString())
            const backupPath = `${dir}/slot${req.params.slotIdx}.backup.json`
            writeFileSync(backupPath, JSON.stringify(backupData))
        }
        req.body.timeStamp = new Date().toLocaleString()
		writeFileSync(filePath, JSON.stringify(req.body))
		res.send(req.body)
	}
    post (req: Request, res: Response): void {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            res.status(400).json({ errors: error.array() })
        } else {
            res.send({ status: 200 })
        }
    }
    // static generateFilePath (): string {
    //     return ''
    // }
}