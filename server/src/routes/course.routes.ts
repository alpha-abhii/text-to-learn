import { Router } from 'express';
import { generateCourseController } from '../controllers/course.controller';

const router = Router();


router.post('/generate', generateCourseController);

export default router;