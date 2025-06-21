import { Request, Response } from 'express';
import logger from '../middlewares/logger';


export class SessionController {
    public async login(req: Request, res: Response): Promise<Response> {
        try {
            const { login, senha } = req.body;
            const service = {}
            const output = {};
            return res.status(200).json(output);
        } catch (err) {
            logger.error(err);
            return res.status(400).json((err as Error).message);
        }
    }
}