import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();

const controleler = new UserController();

router.get('/:id', controleler.getUserProfile);
router.post('/', controleler.store);

export default router;