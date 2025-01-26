import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-white to-purple-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-2xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center">Home Page</h1>
        <p className="text-lg text-gray-600 mb-8 text-center">Welcome to the Home page!</p>

        <div className="grid gap-4">
          <button
            className="px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-xl shadow hover:from-blue-500 hover:to-blue-700"
            onClick={() => navigate('/resume')}
          >
            Go to Resume
          </button>

          <button
            className="px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-xl shadow hover:from-green-500 hover:to-green-700"
            onClick={() => navigate('/mock-interview')}
          >
            Go to Mock Interview
          </button>

          <button
            className="px-6 py-3 bg-gradient-to-r from-purple-400 to-purple-600 text-white font-semibold rounded-xl shadow hover:from-purple-500 hover:to-purple-700"
            onClick={() => navigate('/about')}
          >
            Go to About Page
          </button>
        </div>
      </div>
    </div>
  );
}
