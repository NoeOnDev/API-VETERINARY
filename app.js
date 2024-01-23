import express from 'express';
import sequelize from './src/database/config.js';
import User from './src/models/User.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(PORT , () => {
    console.log(`Server running on port ${PORT}`);
});

sequelize.authenticate().then(() => {
    console.log('Connection established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
});

sequelize.sync({ force: true }).then(() => {}).catch((error) => {
    console.error('Unable to sync:', error);
});
