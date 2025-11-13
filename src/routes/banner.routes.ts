import { Router } from 'express';
import { BannerController } from '../controllers/BannerController';
import upload from '../middlewares/upload';

const router = Router();
const controller = new BannerController();

router.get('/', controller.find);
router.get('/current', controller.current);
router.post('/', upload.single('file'), controller.store);
router.delete('/:cod', controller.changeActive);

export default router;
