import { Request, Response } from 'express'

// 遊戲存檔
class gameArchive {
    get (req: Request, res: Response) {
		res.send({})
	}
    put (req: Request, res: Response) {
		res.send({})
	}
	tempUserSelect (req: Request, res: Response) {
		res.send(req.body)
	}
}

export default new gameArchive()