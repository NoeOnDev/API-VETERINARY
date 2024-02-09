import { Router } from 'express';
import { createPet } from '../controllers/pet.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = Router();

router.post('/create', authenticateToken, createPet);

export default router;