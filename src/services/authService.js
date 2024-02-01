import User from '../models/User.js';
import transporter from './mailerService.js';
import jwt from 'jsonwebtoken';
import { getVerificationEmailHTML } from '../templates/authTemplate.js';

export async function registerUser(userDetails) {
    try {
        const existingEmailUser = await User.findOne({ where: { email: userDetails.email } });
        if (existingEmailUser) {
            throw new Error('Email already registered');
        }

        const existingUsernameUser = await User.findOne({ where: { username: userDetails.username } });
        if (existingUsernameUser) {
            throw new Error('Username already registered');
        }

        const user = await User.create(userDetails);

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' });

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

export async function resendVerificationEmail(userEmail) {
    try {
        const user = await User.findOne({ where: { email: userEmail } });
        if (!user) {
            throw new Error('User not found');
        }

        if (user.emailConfirmed) {
            throw new Error('Email already confirmed');
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' });

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
            throw new Error('User not found');
        }

        user.emailConfirmed = true;
        await user.save();

        return user;
    } catch (error) {
        throw error;
    }
}

export async function loginUser(credentials) {
    try {
        const user = await User.findOne({ where: { email: credentials.email } });
        if (!user) {
            throw new Error('User not found');
        }

        if (!user.emailConfirmed) {
            throw new Error('Email not confirmed');
        }

        const isPasswordValid = user.authenticate(credentials.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' });

        return { user, token };
    } catch (error) {
        throw error;
    }
}