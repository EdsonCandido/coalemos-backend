import { Request, Response, NextFunction } from 'express';
import logger from './logger';
import { verify } from 'jsonwebtoken';
import env from '../configs/env';

type ITokenDecoded = {
  iat: number;
  exp: number;
  sub: string;
  cod_usuario: number;
};

export default function IsAuthenticated(
  req: Request,
  res: Response,
  cb: NextFunction,
) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send('Unauthorized 1');
    }
    const [, token] = authHeader.split(' ');

    if (!token) {
      return res.status(401).send('Unauthorized 2');
    }

    const decoded = verify(token, env.ACCESS_TOKEN_SECRET);

    const { cod_usuario, exp } = decoded as ITokenDecoded;

    const dateNow = Math.floor(Date.now() / 1000);

    if (exp < dateNow) return res.status(401).send('Sessão expirada');

    req.usuario = {
      cod_usuario,
    };

    cb();
  } catch (err) {
    logger.error(err);
    res.status(401).send((err as Error).message);
  }
}
