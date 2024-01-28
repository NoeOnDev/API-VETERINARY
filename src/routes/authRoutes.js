import { Router } from 'express';
import { register, verifyEmail } from '../controllers/authController.js';

const router = Router();

router.post('/register', register);
router.get('/verify-email', verifyEmail);

export default router;