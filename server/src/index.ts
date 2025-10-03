import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'UP', message: 'Server is healthy' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});