import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

export default function MockInterview() {
  const webcamRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [videoBlob, setVideoBlob] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [firstQuestion, setFirstQuestion] = useState("Tell me about yourself");

  const handleStartRecording = () => {
    if (webcamRef.current) {
      const stream = webcamRef.current.stream;
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        setVideoBlob(blob);
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

  const handleUpload = async () => {
    if (!videoBlob) {
      alert("No video recorded!");
      return;
    }

    const formData = new FormData();
    formData.append("video", videoBlob, "interview-video.webm");

    try {
      const response = await fetch("http://localhost:4000/api/interview", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setFeedback(data.feedback);
        setNewQuestion(data.newQuestion);
        setFirstQuestion(""); // Hide the first question after response
      } else {
        alert("Error processing interview.");
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-2xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center">Mock Interview</h1>
        <div className="flex flex-col items-center">
          {firstQuestion && (
            <div className="mb-4 p-4 bg-blue-100 text-blue-900 font-semibold rounded-lg">
              <p>{firstQuestion}</p>
            </div>
          )}
          <Webcam
            audio={true}
            ref={webcamRef}
            className="rounded-lg shadow-md mb-4"
            videoConstraints={{ width: 1280, height: 720, facingMode: "user" }}
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
          {videoBlob && (
            <button
              className="mt-4 px-6 py-3 bg-green-500 text-white font-semibold rounded-xl shadow hover:bg-green-600"
              onClick={handleUpload}
            >
              Upload & Analyze
            </button>
          )}
        </div>
        {feedback && (
          <div className="mt-6 p-4 bg-gray-200 rounded-lg">
            <h2 className="text-xl font-semibold">Feedback:</h2>
            <p>{feedback}</p>
          </div>
        )}
        {newQuestion && (
          <div className="mt-4 p-4 bg-gray-200 rounded-lg">
            <h2 className="text-xl font-semibold">Next Question:</h2>
            <p>{newQuestion}</p>
          </div>
        )}
      </div>
    </div>
  );
}