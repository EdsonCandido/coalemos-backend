import { Request, Response } from "express";
import logger from "../middlewares/logger";

export class UserController {
    public async register(req: Request, res: Response): Promise<Response> {
        try {
            const { login, nome, senha} = req.body;
            // Logic for user registration
            return res.status(201).json({ message: 'User registered successfully' });
        } catch (err) {
            logger.error(err);
            return res.status(400).send((err as Error).message);
        }
    }

    public async getUserProfile(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.params.id;
            // Logic to fetch user profile by userId
            return res.status(200).json({ message: 'User profile fetched successfully' });
        } catch (err) {
            logger.error(err);
            return res.status(400).send((err as Error).message);
        }
    }
}