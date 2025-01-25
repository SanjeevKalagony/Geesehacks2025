const express = require('express');
const multer = require('multer');
const {Configuration, OpenAIApi} = require('openai');

//Multer Configuration
const upload = multer({ dest: 'uploads/' });

// OpenAI API Configuration
require('dotenv').config();
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Create Router
const router = express.Router();

// Resume Critique Route
router.post("/resume", upload.single('resume'), async (req, res) => {
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