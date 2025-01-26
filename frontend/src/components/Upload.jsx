import React, { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || file.type !== "application/pdf") {
      setError("Please select a valid PDF document.");
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await fetch("http://localhost:4000/api/improve-resume", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        const formattedResponse = data.formattedSuggestions.replace(/\\n/g, "<br/>");
        setResponse(formattedResponse);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to upload. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-4 bg-white shadow-lg rounded-xl p-8 max-w-lg w-full">
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="mb-4 p-2 border border-gray-300 rounded cursor-pointer"
      />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {response && (
        <div className="mt-4 bg-gray-100 p-4 rounded text-left">
          <h2 className="text-lg font-bold">Resume Suggestions:</h2>
          
          <div dangerouslySetInnerHTML={{ __html: response }} />
        </div>
      )}
    </div>
  );
}
