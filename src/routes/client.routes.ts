import { Router } from 'express';
import { ClientController } from '../controllers/ClientController';
import upload from '../middlewares/upload';

const router = Router();
const controller = new ClientController();

router.get('/find', controller.find);
router.get('files/find', controller.findFiles);
router.post('store', controller.store);
router.post('/store/files', upload.array('files'), controller.storeFile);

export default router;
