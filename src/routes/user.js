import { Router } from 'express';
import { createUser, login, getUserandPets } from '../controllers/user.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = Router();

router.post('/login', login);
router.post('/register', createUser);
router.get('/profile', authenticateToken, getUserandPets);

export default router;