import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';

// Import routes
import courseRoutes from './routes/course.routes';
import lessonRoutes from './routes/lesson.routes';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());

// API Routes
app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'UP', message: 'Server is healthy' });
});

app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/lessons', lessonRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});