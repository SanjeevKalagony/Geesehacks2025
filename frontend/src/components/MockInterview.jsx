import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

export default function MockInterview() {
  const webcamRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const handleStartRecording = () => {
    if (webcamRef.current) {
      const stream = webcamRef.current.stream;
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          const url = URL.createObjectURL(event.data);
          console.log('Recording URL:', url);
        }
      };
      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-2xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center">Mock Interview</h1>
        <div className="flex flex-col items-center">
          <Webcam
            audio={true}
            ref={webcamRef}
            className="rounded-lg shadow-md mb-4"
            videoConstraints={{
              width: 1280,
              height: 720,
              facingMode: "user"
            }}
          />
          {recording ? (
            <button
              className="px-6 py-3 bg-red-500 text-white font-semibold rounded-xl shadow hover:bg-red-600"
              onClick={handleStopRecording}
            >
              Stop Recording
            </button>
          ) : (
            <button
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl shadow hover:bg-blue-600"
              onClick={handleStartRecording}
            >
              Start Recording
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
