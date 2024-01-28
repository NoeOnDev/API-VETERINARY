import User from '../models/User.js';
import transporter from './mailerService.js';
import jwt from 'jsonwebtoken';
import { getVerificationEmailHTML } from '../templates/authTemplate.js';

export async function registerUser(userDetails) {
    try {
        const user = await User.create(userDetails);

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '3m' });

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

export async function verifyEmailUser(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findByPk(decoded.id);
        if (!user) {
            throw new Error('No se encontró el usuario');
        }

        user.emailConfirmed = true;
        await user.save();

        return user;
    } catch (error) {
        throw error;
    }
}