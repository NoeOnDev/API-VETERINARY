import { Router } from 'express';
import { register, resendVerification, verifyEmail } from '../controllers/authController.js';

const router = Router();

router.post('/register', register);
router.post('/resend-verification', resendVerification);
router.get('/verify-email', verifyEmail);

export default router;