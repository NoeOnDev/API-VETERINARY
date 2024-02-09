import Pet from '../models/pet.js';

export async function createPet(req, res) {
    try {
        const { name, birthdate, type, breed } = req.body;
        const userId = req.user.id;
        const pet = await Pet.create({ name, birthdate, type, breed, userId });
        res.status(201).json(pet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}