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

export async function getPet(req, res) {
    try {
        const pet = await Pet.findByPk(req.params.id);
        res.status(200).json(pet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}