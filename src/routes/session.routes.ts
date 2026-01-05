import { Router } from 'express';
import { SessionController } from '../controllers/SessionController';
import IsAuthenticated from '../middlewares/IsAuthenticated';

const router = Router();

const controller = new SessionController();

router.post('/login', controller.login);
router.post('/change', IsAuthenticated(), controller.changePassword);
router.post('/recover', controller.recoverPassword);
router.post('/refresh-token', controller.refreshToken);
router.post(
  '/force-update',
  IsAuthenticated(['admin']),
  controller.forcerUpdate,
);

export default router;
