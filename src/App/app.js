import express from 'express';
import { database, close } from '../database/connect.js';
import indexRoutes from '../routes/index.js';
import '../models/relations.js';

export async function app() {
    try {
        const PORT = process.env.PORT || 3000;
        const app = express();

        app.use(express.json());
        app.use(indexRoutes);
        app.listen(PORT, () => console.log(`Server running on http://127.0.0.1:${PORT}`));
        
        await database();

        process.on('SIGINT', close);
    } catch (error) {
        console.error('Unable to start the server:', error.message);
    }
}