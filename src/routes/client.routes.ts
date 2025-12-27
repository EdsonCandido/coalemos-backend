import { Router } from 'express';
import { ClientController } from '../controllers/ClientController';
import upload from '../middlewares/upload';

const router = Router();
const controller = new ClientController();

router.get('/find', controller.find);
router.get('/files/find', controller.findFiles);
router.get('/find/uf', controller.findUF);
router.get('/find/cidade', controller.findCidade);
router.get('/search/cep', controller.searchCEP);
router.post('store', controller.store);
router.post('/store/files', upload.array('files'), controller.storeFile);

export default router;
