import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Home Page</h1>
      <p className="text-lg text-gray-600 mb-8">Welcome to the Home page!</p>

      <div className="grid gap-4">
        <button
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl shadow hover:bg-blue-600"
          onClick={() => navigate('/resume')}
        >
          Go to Resume
        </button>

        <button
          className="px-6 py-3 bg-green-500 text-white font-semibold rounded-xl shadow hover:bg-green-600"
          onClick={() => navigate('/mock-interview')}
        >
          Go to Mock Interview
        </button>

        <button
          className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-xl shadow hover:bg-purple-600"
          onClick={() => navigate('/about')}
        >
          Go to About Page
        </button>
      </div>
    </div>
  );
}
