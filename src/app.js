import express from 'express';
import userRoutes from './routes/authenticateRoutes.js';
import { database } from './database/database.js';

export async function app() {
    try {
        const PORT = process.env.PORT || 3000;
        const app = express();

        app.use(express.json());
        app.use(userRoutes);
        app.listen(PORT, () => console.log(`Server running on http://127.0.0.1:${PORT}`));
        
        await database();
    } catch (error) {
        console.error('Unable to start the server:', error.message);
    }
}
