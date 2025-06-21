import { Router } from "express";
import  {SessionController}  from "../controllers/SessionController";

const router = Router();

const controller = new SessionController();

router.post('/login', controller.login);

export default router;