import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function login(req, res) {
    try {
        const { email , password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        res.status(200).json({ message: 'User logged in', username: user.username, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function createUser(req, res) {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ message: 'User created', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getUserandPets (req, res) {
    try {
        const user = await User.findByPk(req.user.id, { include: 'pets' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getAllUsersAndPets (req, res) {
    try {
        const users = await User.findAll({ include: 'pets' });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}