import { Router } from 'express';
import { CompanyController } from '../controllers/CompanyController';

const router = Router();
const controller = new CompanyController();

router.get('/', controller.find);
router.post('/', controller.store);
router.delete('/', controller.changeActive);

export default router;