import express from 'express';
import sequelize from './src/database/config.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.listen(PORT , () => {
    console.log(`Server running on port ${PORT}`);
});

sequelize.authenticate().then(() => {
    console.log('Connection established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
});
