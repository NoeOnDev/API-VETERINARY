import { Router } from 'express';
import authRoutes from './authRoutes.js';

const router = Router();

router.use(authRoutes);

export default router;