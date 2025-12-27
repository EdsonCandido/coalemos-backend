import { Request, Response, NextFunction } from 'express';
import logger from './logger';
import { verify } from 'jsonwebtoken';
import env from '../configs/env';

type ITokenDecoded = {
  iat: number;
  exp: number;
  sub: string;
  cod_usuario: number;
  perfil: string;
};

export default function IsAuthenticated(requiredRoles: string[] = []) {
  return async (req: Request, res: Response, cb: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).send('Token not found');
      }
      const [, token] = authHeader.split(' ');

      if (!token) {
        return res.status(401).send('Token not found');
      }

      const decoded = verify(token, env.ACCESS_TOKEN_SECRET);

      const { cod_usuario, perfil, exp } = decoded as ITokenDecoded;

      const dateNow = Math.floor(Date.now() / 1000);

      if (exp < dateNow) return res.status(401).send('Sessão expirada');

      if (requiredRoles.length > 0 && !requiredRoles.includes(perfil)) {
        return res.status(403).json({ error: 'Acesso negado' });
      }

      req.usuario = {
        cod_usuario,
        perfil,
      };

      cb();
    } catch (err) {
      logger.error(err);
      res.status(401).send((err as Error).message);
    }
  };
}
