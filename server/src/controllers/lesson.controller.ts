import { Request, Response } from 'express';
import { generateLessonContentFromAI } from '../services/ai.service';
import Lesson from '../models/Lesson.model';

export const generateLessonContentController = async (req: Request, res: Response) => {
    const { lessonId, courseTitle, moduleTitle, lessonTitle } = req.body;

    if (!lessonId || !courseTitle || !moduleTitle || !lessonTitle) {
        return res.status(400).json({ message: 'lessonId, courseTitle, moduleTitle, and lessonTitle are required.' });
    }

    try {
        const lessonContent = await generateLessonContentFromAI(courseTitle, moduleTitle, lessonTitle);

        const updatedLesson = await Lesson.findByIdAndUpdate(
            lessonId,
            { 
                content: lessonContent.content,
                isEnriched: true
            },
            { new: true }
        );

        if (!updatedLesson) {
            return res.status(404).json({ message: 'Lesson not found.' });
        }

        res.status(200).json({
            message: 'Lesson content generated and updated successfully!',
            lesson: updatedLesson
        });

    } catch (error) {
        console.error('Error generating lesson content:', error);
        res.status(500).json({ message: 'Failed to generate lesson content.' });
    }
};