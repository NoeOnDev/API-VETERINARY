import { Router } from 'express';
import { createPet, getPetfromUser } from '../controllers/pet.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = Router();

router.post('/create', authenticateToken, createPet);
router.get('/pet', authenticateToken, getPetfromUser);

export default router;