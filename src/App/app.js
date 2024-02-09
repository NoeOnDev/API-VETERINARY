import express from 'express';
import { database, close } from '../database/connect.js';

export async function app() {
    try {
        const PORT = process.env.PORT || 3000;
        const app = express();

        app.use(express.json());
        app.listen(PORT, () => console.log(`Server running on http://127.0.0.1:${PORT}`));
        
        await database();

        process.on('SIGINT', async () => {
            try {
                await close();
                console.log('Database connection closed');
                process.exit(0);
            } catch (error) {
                console.error('Unable to close the database connection:', error);
                process.exit(1);
            }
        });
    } catch (error) {
        console.error('Unable to start the server:', error.message);
    }
}