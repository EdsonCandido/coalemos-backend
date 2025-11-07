import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();

const controleler = new UserController();

router.get('/', controleler.getUserProfile);
router.post('/', controleler.store);
router.post('/valid', controleler.validLogin);
router.put('/:cod', controleler.changeActive);

export default router;
