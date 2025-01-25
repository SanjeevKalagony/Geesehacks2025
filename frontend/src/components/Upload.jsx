import React, { useState } from 'react';

export default function Upload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (file && file.type === 'application/pdf') {
      // Handle the file upload logic here
      console.log('Uploading:', file);
    } else {
      alert('Please select a PDF document.');
    }
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <input 
        type="file" 
        accept="application/pdf" 
        onChange={handleFileChange} 
        className="mb-4 p-2 border border-gray-300 rounded cursor-pointer"
        style={{ display: 'block', marginBottom: '10px' }}
      />
      <button 
        onClick={handleUpload} 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        Upload
      </button>
    </div>
  );
}
