import jwt from 'jsonwebtoken';
import transporter from '../services/mailer.js';
import User from '../models/User.js';

export async function register(req, res) {
    try {
        const user = await User.create(req.body);

        const token = jwt.sign({ id: user.id }, 'tuSecreto', { expiresIn: '1m' });

        const mailOptions = {
            from: process.env.EMAIL_NODEMAILER,
            to: user.email,
            subject: 'Verifica tu correo electrónico',
            text: `Hola ${user.firstname}, por favor verifica tu correo electrónico usando el siguiente enlace: http://localhost:9020/verify-email?token=${token}`
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json(user);
    } catch (error) {
        res.status(400).json(error);
    }
}

export async function verifyEmail(req, res) {
    try {
        const token = req.query.token;

        const payload = jwt.verify(token, 'tuSecreto');

        const user = await User.findByPk(payload.id);

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        user.emailConfirmed = true;

        await user.save();

        res.send('Correo electrónico verificado con éxito');
    } catch (error) {
        if (error.message === 'jwt expired') {
            res.status(400).send('El token ha caducado');
        } else {
            res.status(400).send('Error al verificar el correo electrónico');
        }
    }
}

export async function getAll(req, res) {
    try {
        const users = await User.findAll();

        res.json(users);
    } catch (error) {
        res.status(400).json(error);
    }
}