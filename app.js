import express from 'express';
import { database } from './src/database/database.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.listen(PORT);
database();