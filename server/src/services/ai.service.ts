import mongoose from 'mongoose';

export const generateCourseOutlineFromAI = async (topic: string) => {
    console.log(`Generating course outline for topic: ${topic}`);

    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockCourseData = {
        title: `Introduction to ${topic}`,
        description: `A comprehensive beginner's guide to ${topic}.`,
        tags: [topic.toLowerCase(), 'beginner', 'education'],
        modules: [
            {
                _id: new mongoose.Types.ObjectId(),
                title: 'Module 1: Getting Started',
                lessons: [
                    { _id: new mongoose.Types.ObjectId(), title: 'Lesson 1.1: Core Concepts' },
                    { _id: new mongoose.Types.ObjectId(), title: 'Lesson 1.2: The Basics' },
                ],
            },
            {
                _id: new mongoose.Types.ObjectId(),
                title: 'Module 2: Advanced Topics',
                lessons: [
                    { _id: new mongoose.Types.ObjectId(), title: 'Lesson 2.1: Deep Dive' },
                    { _id: new mongoose.Types.ObjectId(), title: 'Lesson 2.2: Practical Applications' },
                ],
            },
        ],
    };

    return mockCourseData;
};