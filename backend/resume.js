const express = require('express');
const multer = require('multer');
const path = require('path');
const { OpenAI } = require('openai');

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Specify folder where files are stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);  // Unique filename
  },
});

// Initialize Multer with the storage configuration
const upload = multer({ storage: storage });

// OpenAI API Configuration
require('dotenv').config();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Create Router
const router = express.Router();

// Resume Critique Route
router.get("/improve-resume", upload.single('resume'), async (req, res) => {
    try {
        const resumeText = req.body.resume || ''; // If resume text is send as JSON
        const resumeFile = req.file || ''; // If resume is uploaded as a file

        let parsedResume = resumeText

        if (resumeFile) {
            parsedResume = `Uploaded file path: ${resumeFile.path}`;
        }

        // AI logic for resume improvement
        const prompt = `
        Here is a resume text:
        ${parsedResume}

        Please analyze the resume and provide suggestions for improvement in terms of:
        - Formatting
        - Grammar and language
        - Missing key skills or achievements`;

        const response = await openai.createCompletion({
            model : 'gpt-4-turbo',
            prompt,
            max_tokens: 500,
        });
        const suggestions = response.data.choices[0].text.trim();

        res.json({ 
            success: true,
            suggestions 
        });
    } catch (error) {
        console.error('Error parsing resume: ', error.message);
        res.status(500).json({ 
            success: false,
            message: 'Failed to parse resume',
        });
    }
});

module.exports = router;