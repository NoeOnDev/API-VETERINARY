import { registerUser, resendVerificationEmail,verifyEmailUser, loginUser } from '../services/authService.js';

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

export async function resendVerification(req, res) {
    try {
        const user = await resendVerificationEmail(req.body.email);

        res.status(200).json({
            message: 'Verification email sent successfully',
            userId: user.id
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function verifyEmail(req, res) {
    try {
        const user = await verifyEmailUser(req.query.token);

        res.status(200).json({
            message: 'Email verified successfully',
            userId: user.id
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function login(req, res) {
    try {
        const credenciales = req.body;

        const { user, token } = await loginUser(credenciales);

        res.status(200).json({
            message: 'Login successful',
            userId: user.id,
            token: token
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}