import { Router } from 'express';
import { generateLessonContentController } from '../controllers/lesson.controller';

const router = Router();

router.post('/generate', generateLessonContentController);

export default router;