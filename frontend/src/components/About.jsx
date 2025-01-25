import React from 'react';
import '../index.css'; // Ensure this import is present
import Upload from './Upload';

export default function About() {
  return (
    <div>
      <h1>About Page</h1>
      <p className="text-lg font-semibold text-blue-500 mt-4">
        Welcome to the About page!
      </p>
      <Upload />
    </div>
  );
}



