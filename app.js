import express from 'express';
import sequelize from './src/database/config.js';
import User from './src/models/User.js';
import { register } from './src/controllers/authenticateController.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.post('/register', register);

app.listen(PORT , () => {
    console.log(`Server running on port ${PORT}`);
});

sequelize.authenticate().then(() => {
    console.log('Connection established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
});

sequelize.sync( { force: true } ).then(() => {
    console.log('All models were synchronized successfully.');
}).catch((error) => {
    console.error('Unable to synchronize the models:', error);
});