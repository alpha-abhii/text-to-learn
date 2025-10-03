import { GoogleGenAI } from '@google/genai';
import mongoose from 'mongoose';

const ai = new GoogleGenAI({});

export const generateCourseOutlineFromAI = async (topic: string) => {
  const modelName = 'gemini-2.5-flash';

  const prompt = `
        You are an expert curriculum designer. Your task is to generate a structured course outline for the topic: "${topic}".
        The course should be aimed at beginners.

        Please generate the following:
        1. A concise and engaging course title.
        2. A brief, one-paragraph course description.
        3. An array of 3 relevant tags.
        4. An array of 3-4 modules.
        5. For each module, provide a title and an array of 3-5 lesson titles.

        IMPORTANT: Your response MUST be a raw JSON object only. Do not include any markdown formatting like \`\`\`json or any explanatory text. The JSON object should strictly follow this structure:
        {
          "title": "string",
          "description": "string",
          "tags": ["string"],
          "modules": [
            {
              "title": "string",
              "lessons": [
                { "title": "string" }
              ]
            }
          ]
        }
    `;

  let text: string | undefined = undefined;
  try {
    const result = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
    });

    text = result.text;

    if (!text) {
      throw new Error("AI response text is undefined.");
    }

    const cleanedJson = text.replace(/```json\s*|```/gs, '').trim();
    const courseData = JSON.parse(cleanedJson);

    courseData.modules.forEach((module: any) => {
      module._id = new mongoose.Types.ObjectId();
      module.lessons.forEach((lesson: any) => {
        lesson._id = new mongoose.Types.ObjectId();
      });
    });

    return courseData;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof SyntaxError) {
      console.error("API response was not valid JSON. Response text:", text);
    }
    throw new Error("Failed to generate course outline from AI.");
  }
};


export const generateLessonContentFromAI = async (courseTitle: string, moduleTitle: string, lessonTitle: string) => {
  const modelName = 'gemini-2.5-flash';

  const prompt = `
        You are an expert educator. Your task is to generate the content for a specific lesson within a course.
        The context is:
        - Course: "${courseTitle}"
        - Module: "${moduleTitle}"
        - Lesson: "${lessonTitle}"

        Please generate the following in a structured format:
        1. An array of 3-5 learning objectives for this lesson.
        2. A "content" array of structured blocks. This array should include a mix of the following types:
            - A "heading" block.
            - Several "paragraph" blocks with detailed explanations.
            - A "code" block with a relevant example if the topic is technical. If not, omit it.
            - A "video" block with a concise, effective YouTube search query (not a URL).
        3. An array of 3-4 multiple-choice questions (MCQs) to test understanding. Each MCQ should have options and an explanation for the correct answer.

        IMPORTANT: Your response MUST be a raw JSON object only. Do not include any markdown. The JSON object must strictly follow this structure:
        {
          "objectives": ["string"],
          "content": [
            { "type": "heading", "text": "string" },
            { "type": "paragraph", "text": "string" },
            { "type": "code", "language": "string", "text": "string" },
            { "type": "video", "query": "string" }
          ],
          "mcqs": [
            { 
              "question": "string", 
              "options": ["string"], 
              "correctAnswerIndex": number,
              "explanation": "string"
            }
          ]
        }
    `;
  let text: string | undefined = undefined;
  try {
    const result = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
    });

    text = result.text;

    if (!text) {
      throw new Error("AI response text is undefined.");
    }

    const cleanedJson = text.replace(/```json\s*|```/gs, '').trim();
    const lessonData = JSON.parse(cleanedJson);

    return lessonData;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof SyntaxError) {
      console.error("API response was not valid JSON. Response text:", text);
    }
    throw new Error("Failed to generate lesson content from AI.");
  }
};
