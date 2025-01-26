const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const { Storage } = require("@google-cloud/storage");
const speech = require("@google-cloud/speech");
const { OpenAI } = require("openai");
require("dotenv").config();

const router = express.Router();

// Multer configuration for file uploads
const upload = multer({ dest: "uploads/" });

// Google Cloud and OpenAI setup
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const gcStorage = new Storage({
    projectId: process.env.GCP_PROJECT_ID,
    keyFilename: process.env.GCP_KEY_FILE,
});

const bucketName = process.env.GCP_BUCKET_NAME;
const speechClient = new speech.SpeechClient({
    projectId: process.env.GCP_PROJECT_ID,
    keyFilename: process.env.GCP_KEY_FILE,
});

// Helper function: Upload file to Google Cloud Storage
const uploadToGCS = async (filePath, destination) => {
    const bucket = gcStorage.bucket(bucketName);
    await bucket.upload(filePath, { destination });
    return `gs://${bucketName}/${destination}`;
};

// Helper function: Convert video to audio
const convertVideoToAudio = (videoPath, outputAudioPath) => {
    return new Promise((resolve, reject) => {
        ffmpeg(videoPath)
            .toFormat("wav") // Ensure WebM to WAV conversion
            .output(outputAudioPath)
            .on("end", () => resolve(outputAudioPath))
            .on("error", (err) => reject(err))
            .run();
    });
};

// Helper function: Transcribe audio using Google Speech-to-Text
const transcribeAudio = async (gcsUri) => {
    const audio = {
        uri: gcsUri,
    };

    const config = {
        encoding: "LINEAR16",
        languageCode: "en-US",
        enableAutomaticPunctuation: true,
    };

    const request = {
        audio,
        config,
    };

    const [response] = await speechClient.recognize(request);
    if (!response.results.length) {
        throw new Error("No transcription results found.");
    }

    return response.results.map(r => r.alternatives[0].transcript).join("\n");
};

// Main interview logic
router.post("/interview", upload.single("video"), async (req, res) => {
    try {
        const videoFile = req.file;

        if (!videoFile) {
            return res.status(400).json({ success: false, message: "No video file provided." });
        }

        const audioPath = `uploads/${path.parse(videoFile.filename).name}.wav`;
        const gcsFileName = `uploads/${videoFile.filename}`;

        // Step 1: Convert video to audio
        await convertVideoToAudio(videoFile.path, audioPath);

        // Step 2: Upload audio to Google Cloud Storage
        const gcsUri = await uploadToGCS(audioPath, gcsFileName);

        // Step 3: Transcribe audio using Google Speech-to-Text
        const transcription = await transcribeAudio(gcsUri);

        // Step 4: Analyze transcription with OpenAI
        const analysisPrompt = `
        Interview Response:
        "${transcription}"

        Please analyze the response and provide:
        1. Constructive feedback on the content, delivery, and grammar.
        2. Suggestions for improvement.
        `;

        const analysisResponse = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [
                { role: "system", content: "You are a professional mock interview coach." },
                { role: "user", content: analysisPrompt },
            ],
            max_tokens: 500,
        });

        const feedback = analysisResponse.choices[0].message.content.trim();

        // Step 5: Generate next question
        const questionPrompt = `
        Based on the candidate's previous response, generate a new interview question to challenge them further. Start straight with the question. Here's the candidate's previous response: ${transcription}
        `;

        const questionResponse = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [
                { role: "system", content: "You are a professional interview question generator." },
                { role: "user", content: questionPrompt },
            ],
            max_tokens: 150,
        });

        const newQuestion = questionResponse.choices[0].message.content.trim();

        // Clean up local files
        fs.unlinkSync(videoFile.path);
        fs.unlinkSync(audioPath);

        // Return feedback and next question
        res.json({
            success: true,
            feedback,
            newQuestion,
        });
    } catch (error) {
        console.error("Error during mock interview:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to process the interview.",
        });
    }
});

module.exports = router;