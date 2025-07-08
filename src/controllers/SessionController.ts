import { Request, Response } from 'express';
import logger from '../middlewares/logger';
import { LoginService } from '../services/session/LoginService';


export class SessionController {
    public async login(req: Request, res: Response): Promise<Response> {
        try {
            const { login, senha } = req.body;
            const service = new LoginService();
            const output = await service.execute(login, senha);
            return res.status(200).json(output);
        } catch (err) {
            logger.error(err);
            return res.status(400).json((err as Error).message);
        }
    }
}