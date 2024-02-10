import { Router } from 'express';
import { createPet, getPet, getPetfromUser } from '../controllers/pet.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = Router();

router.post('/create', authenticateToken, createPet);
router.get('/pet', authenticateToken, getPetfromUser);
router.get('/:id', authenticateToken, getPet);

export default router;