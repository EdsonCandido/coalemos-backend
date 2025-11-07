import { Request, Response } from 'express';
import logger from '../middlewares/logger';
import { FindUserByCodService } from '../services/users/FindUserByCodService';
import { StoreUserService } from '../services/users/StoreUserService';
import { ChangeActiveUserByCodService } from '../services/users/ChangeActiveUserByCodService';
import { ValidLoginUserService } from '../services/users/ValidLoginUserService';

export class UserController {
  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const { cpf, login, nome, cod, senha, is_admin, is_primeiro_acesso } =
        req.body;
      const service = new StoreUserService();
      const output = await service.execute({
        cpf,
        login,
        nome,
        cod,
        senha,
        is_admin,
        is_primeiro_acesso,
      });
      return res.status(200).json(output);
    } catch (err) {
      logger.error(err);
      return res.status(400).send((err as Error).message);
    }
  }

  public async getUserProfile(req: Request, res: Response): Promise<Response> {
    try {
      const cod = req.query.cod as string;
      const service = new FindUserByCodService();
      const output = await service.execute(parseInt(cod));
      return res.status(200).json(output);
    } catch (err) {
      logger.error(err);
      return res.status(400).send((err as Error).message);
    }
  }

  public async validLogin(req: Request, res: Response): Promise<Response> {
    try {
      const { login } = req.body;

      const service = new ValidLoginUserService();
      const output = await service.execute(login);
      return res.status(200).json(output);
    } catch (err) {
      logger.error(err);
      return res.status(400).send((err as Error).message);
    }
  }

  public async changeActive(req: Request, res: Response): Promise<Response> {
    try {
      const cod = req.params.cod;
      const service = new ChangeActiveUserByCodService();
      const output = await service.execute(parseInt(cod));
      return res.status(200).json(output);
    } catch (err) {
      logger.error(err);
      return res.status(400).send((err as Error).message);
    }
  }
}
