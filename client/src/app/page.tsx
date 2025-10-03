'use client';

import React, { useState } from 'react';
import { generateCourse } from '@/utils/api'; // Import our API helper

export default function HomePage() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [course, setCourse] = useState<any>(null); // State to hold the generated course

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('Topic cannot be empty.');
      return;
    }

    setLoading(true);
    setError(null);
    setCourse(null);

    try {
      // The controller needs a userId, but our new auth SDK doesn't expose it on the client.
      // For now, we'll remove it from the backend controller's requirements.
      const data = await generateCourse(topic);
      setCourse(data.course);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-black">Create a New Course</h1>
      <p className="text-gray-600 mb-8">
        Enter a topic you want to learn about, and our AI will generate a structured course for you.
      </p>

      <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., Introduction to React Hooks"
          className="flex-grow p-3 border border-gray-300 rounded-lg text-black"
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-blue-600 text-black font-bold py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Course'}
        </button>
      </form>

      {error && <div className="text-red-500 bg-red-100 p-4 rounded-lg">{error}</div>}

      {course && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
          <p className="text-gray-700 mb-4">{course.description}</p>
          <div className="flex gap-2">
            {course.tags.map((tag: string) => (
              <span key={tag} className="bg-gray-200 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}