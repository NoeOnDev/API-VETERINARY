import User from '../models/User.js';
import transporter from '../mailer.js';
import jwt from 'jsonwebtoken';

export async function register(req, res) {
    try {
        const user = await User.create(req.body);

        const token = jwt.sign({ id: user.id }, 'tuSecreto', { expiresIn: '1h' });

        const mailOptions = {
            from: process.env.EMAIL_NODEMAILER,
            to: user.email,
            subject: 'Verifica tu correo electrónico',
            text: `Hola ${user.firstname}, por favor verifica tu correo electrónico usando el siguiente enlace: http://localhost:3000/verify-email?token=${token}`
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json(user);
    } catch (error) {
        res.status(400).json(error);
    }
}