import express from 'express';
import { config } from 'dotenv';

config();

const PORT = process.env.PORT || 3000;
const app = express();

app.listen(PORT);