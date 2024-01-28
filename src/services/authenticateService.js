import User from '../models/User.js';
import transporter from './mailerService.js';
import jwt from 'jsonwebtoken';
import { getVerificationEmailHTML } from '../templates/authenticateTemplate.js';

export async function registerUser(userDetails) {
    try {
        const user = await User.create(userDetails);

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '3m' });

        const mailOptions = {
            from: 'alxg5516@gmail.com',
            to: user.email,
            subject: 'Verifica tu correo electrónico',
            html:  getVerificationEmailHTML(token)
        };

        await transporter.sendMail(mailOptions);

        return user;
    } catch (error) {
        throw error;
    }
}