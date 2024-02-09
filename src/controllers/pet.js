import Pet from '../models/pet.js';

export async function createPet(req, res) {
    try {
        const userId = req.user.id;
        const pet = await Pet.create({ ...req.body, userId });
        res.status(201).json(pet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}