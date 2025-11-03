import env from '../configs/env';
import { Router } from 'express';
import IsAuthenticated from '../middlewares/IsAuthenticated';

import userRoutes from './user.routes';
import sessionRoutes from './session.routes';
import clientRoutes from './client.routes';
import bannerRoutes from './banner.routes';
const router = Router();

router.get('/', function (req, res, next) {
  res.status(200).json({
    message: 'API',
    development: '@ZUKO',
    environment: env.NODE_ENV,
    version: process.env.npm_package_version || '1.0.0',
  });
});

router.use('/session', sessionRoutes);
router.use('/users', IsAuthenticated, userRoutes);
router.use('/clients', IsAuthenticated, clientRoutes);
router.use('/banners', IsAuthenticated, bannerRoutes);

export default router;
