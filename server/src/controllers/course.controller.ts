import { Request, Response } from 'express';
import { generateCourseOutlineFromAI } from '../services/ai.service';
import Course from '../models/Course.model';
import Module from '../models/Module.model';
import Lesson from '../models/Lesson.model';
import mongoose from 'mongoose';

export const generateCourseController = async (req: Request, res: Response) => {
    const { topic } = req.body;

    // if (!topic || !userId) {
    //     return res.status(400).json({ message: 'Topic and userId are required.' });
    // }

    const userId = 'placeholder-user'; 

    if (!topic) {
        return res.status(400).json({ message: 'Topic is required.' });
    }

    try {
        const courseData = await generateCourseOutlineFromAI(topic);

        const session = await mongoose.startSession();
        session.startTransaction();

        let courseId;

        try {
            const newCourse = new Course({
                title: courseData.title,
                description: courseData.description,
                creator: userId,
                tags: courseData.tags,
            });

            const moduleIds = [];
            for (const module of courseData.modules) {
                const lessonIds = [];
                for (const lesson of module.lessons) {
                    const newLesson = new Lesson({
                        _id: lesson._id,
                        title: lesson.title,
                        module: module._id,
                        content: [{ type: 'paragraph', text: 'Content will be generated later.' }],
                    });
                    await newLesson.save({ session });
                    lessonIds.push(newLesson._id);
                }

                const newModule = new Module({
                    _id: module._id,
                    title: module.title,
                    course: newCourse._id,
                    lessons: lessonIds,
                });
                await newModule.save({ session });
                moduleIds.push(newModule._id);
            }
            
            newCourse.modules = moduleIds;
            const savedCourse = await newCourse.save({ session });
            courseId = savedCourse._id;

            await session.commitTransaction();

            res.status(201).json({ 
                message: 'Course generated and saved successfully!', 
                course: savedCourse
            });

        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }

    } catch (error) {
        console.error('Error generating course:', error);
        res.status(500).json({ message: 'Failed to generate course.' });
    }
};