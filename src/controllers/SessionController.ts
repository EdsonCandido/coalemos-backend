import { Request, Response } from 'express';
import logger from '../middlewares/logger';
import { LoginService } from '../services/session/LoginService';
import { ChangePasswordService } from '../services/session/ChangePasswordService';


export class SessionController {
    public async login(req: Request, res: Response): Promise<Response> {
        try {
            const { login, senha } = req.body;
            const service = new LoginService();
            const output = await service.execute(login, senha);
            return res.status(200).json(output);
        } catch (err) {
            logger.error(err);
            return res.status(400).send((err as Error).message);
        }
    }
    public async recoverPassword(req: Request, res: Response): Promise<Response> {
        try {
            const { login } = req.body;
            return res.status(200).json({ message: 'Password recovery initiated' });
        } catch (err) {
            logger.error(err);
            return res.status(400).send((err as Error).message);
        }
    }
    public async changePassword(req: Request, res: Response): Promise<Response> {
        try {
            const cod_usuario = req.usuario.cod_usuario;
            const { newPassword, oldPassword } = req.body;
            const service = new ChangePasswordService();
            const output = await service.execute({ cod_usuario, newPassword, oldPassword });
            return res.status(200).json(output);
        } catch (err) {
            logger.error(err);
            return res.status(400).send((err as Error).message);
        }
    }
    public async logout(req: Request, res: Response): Promise<Response> {
        try {
            return res.status(200).json({ message: 'Logged out successfully' });
        } catch (err) {
            logger.error(err);
            return res.status(400).send((err as Error).message);
        }
    }

}