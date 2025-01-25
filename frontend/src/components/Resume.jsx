import React from 'react'
import Upload from './Upload';

export default function 
() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 p-1 rounded-xl">
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-lg w-full">
          <h1 style={{ fontWeight: 'bold', fontSize: '2em', color: '#4A90E2' }}>Upload your Resume: </h1>
          <Upload />
        </div>
      </div>
    </div>
  )
}
