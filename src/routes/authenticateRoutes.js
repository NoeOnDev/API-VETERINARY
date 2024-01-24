import { Router } from 'express';
import { register, verifyEmail, getAll } from '../controllers/authenticateController.js';

const router = Router();

router.post('/register', register);
router.get('/verify-email', verifyEmail);
router.get('/users', getAll);

export default router;