import { registerUser } from '../services/authenticateService.js';

export async function register(req, res) {
    try {
        const user = await registerUser(req.body);

        res.status(201).json({
            message: 'User registered successfully, please check your email for verification',
            userId: user.id
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}