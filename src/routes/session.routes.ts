import { Router } from 'express';
import { SessionController } from '../controllers/SessionController';
import IsAuthenticated from '../middlewares/IsAuthenticated';

const router = Router();

const controller = new SessionController();

router.post('/login', controller.login);
router.post('/change', IsAuthenticated, controller.changePassword);
router.post('/recover', controller.recoverPassword);
router.post('/refresh-token', IsAuthenticated, controller.refreshToken);

export default router;
