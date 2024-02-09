import { Router } from 'express';
import userRoutes from './user.js';
import petRoutes from './pet.js';

const router = Router();

router.use('/user', userRoutes);
router.use('/pet', petRoutes);

export default router;