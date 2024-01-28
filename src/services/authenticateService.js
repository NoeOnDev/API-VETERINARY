import User from '../models/User.js';
import transporter from './mailerService.js';
import jwt from 'jsonwebtoken';

export async function registerUser(userDetails) {
    try {
        const user = await User.create(userDetails);

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '3m' });

        const mailOptions = {
            from: 'alxg5516@gmail.com',
            to: user.email,
            subject: 'Verifica tu correo electrónico',
            text: `Haz clic en este enlace para verificar tu correo electrónico: http://127.0.0.1:9020/verify-email?token=${token}`
        };

        await transporter.sendMail(mailOptions);

        return user;
    } catch (error) {
        throw error;
    }
}