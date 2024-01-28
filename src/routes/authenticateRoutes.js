import { Router } from 'express';
import { register } from '../controllers/authenticateController.js';

const router = Router();

router.post('/register', register);

export default router;