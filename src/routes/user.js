import { Router } from 'express';
import { createUser, login } from '../controllers/user.js';

const router = Router();

router.post('/login', login);
router.post('/create', createUser);

export default router;