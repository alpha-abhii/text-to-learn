export const generateCourse = async (topic: string) => {
    try {
        const response = await fetch('/api/v1/courses/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ topic }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to generate course');
        }

        return await response.json();
    } catch (error) {
        console.error("Error in generateCourse API call:", error);
        throw error;
    }
};