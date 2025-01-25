import React from 'react';
import '../index.css';
import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate(); // Hook for navigation

  const handleGetStarted = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-white to-purple-100 p-6">
      <div className="max-w-4xl bg-white shadow-lg rounded-xl p-10">
        <h1 className="text-4xl font-bold text-blue-600 text-center mb-6">
          Welcome to <span className="text-purple-600">Skill Scan</span>!
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          <span className="text-blue-600 font-semibold">Skill Scan</span> is your ultimate solution for enhancing your career journey. It provides <span className="text-green-600 font-semibold">real-time, role-specific feedback</span> tailored to the positions you’re applying for, helping you identify areas of improvement and refine your skills. Whether you're preparing for job applications or aiming to elevate your resume, <span className="text-blue-600 font-semibold">Skill Scan</span> offers actionable insights to align your profile with industry expectations.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Our platform goes beyond generic feedback by analyzing your resume and performance in key skill areas, ensuring you meet the specific demands of your desired roles. With <span className="text-blue-600 font-semibold">Skill Scan</span>, you can confidently navigate the job market, make informed decisions, and stay ahead of the competition.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          <span className="text-blue-600 font-semibold">Skill Scan</span> empowers you to:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 pl-4">
          <li>Gain <span className="text-green-600 font-semibold">personalized, real-time feedback</span> targeted at the roles you aspire to.</li>
          <li>Identify <span className="text-red-600 font-semibold">strengths and weaknesses</span> in your profile.</li>
          <li>Receive <span className="text-green-600 font-semibold">actionable recommendations</span> to improve your resume and skill set.</li>
          <li>Ensure your application stands out in today’s competitive job market.</li>
        </ul>
        <p className="text-lg text-gray-700 mb-4">
          Whether you're a recent graduate or a seasoned professional, <span className="text-blue-600 font-semibold">Skill Scan</span> equips you with the tools and insights needed to succeed in your career goals.
        </p>
        <button
          onClick={handleGetStarted} // Trigger navigation on click
          className="mt-6 px-6 py-2 bg-blue-600 text-white text-lg font-semibold rounded-full shadow hover:bg-blue-700 transition duration-300"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}


