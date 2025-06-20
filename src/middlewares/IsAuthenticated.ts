import { Request, Response, NextFunction } from "express";
import logger from "./logger";
import { verify } from 'jsonwebtoken'
import env from "../configs/env";

type ITokenDecoded = {
    iat: number;
    exp: number;
    sub: string;
    cod_usuario: number,
}

export default function IsAuthenticated(req: Request, res: Response, cb: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const [, token] = authHeader.split(' ');

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = verify(token, env.ACCESS_TOKEN_SECRET);

        const { cod_usuario } = decoded as ITokenDecoded;

        req.usuario = {
            cod_usuario
        }

        cb();
    } catch (err) {
        logger.error(err)
        res.status(401).json({ message: "Unauthorized" });
    }
}