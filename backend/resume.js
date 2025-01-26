const express = require('express');
const multer = require('multer');
const path = require('path');
const { OpenAI } = require('openai');
const fs = require('fs');
const pdfParse = require('pdf-parse');

const uploadDir = path.join(__dirname, 'uploads');

// Check if uploads directory exists, if not, create it
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Set up Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    },
});

const upload = multer({ storage: storage });

// OpenAI API Configuration
require('dotenv').config();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const router = express.Router();

// Format API response
const formatApiResponse = (responseText) => {
    // Replace **bold text** with <b>bold text</b>
    let formattedText = responseText.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

    // Add newline before numbered points (e.g., "1.", "2.")
    formattedText = formattedText.replace(/(\d+\.)/g, "\\n$1");

    // Add newlines before and after "### sometext:" pattern
    formattedText = formattedText.replace(/(###\s.*?:)/g, "\\n$1\\n");

    return formattedText;
};

router.post('/improve-resume', upload.single('resume'), async (req, res) => {
    try {
        const resumeFile = req.file || null;
        let parsedResume = req.body.resume || ''; // Text-based resume fallback

        // Process uploaded resume file
        if (resumeFile) {
            if (resumeFile.mimetype === 'application/pdf') {
                const pdfBuffer = fs.readFileSync(resumeFile.path);
                const pdfData = await pdfParse(pdfBuffer);
                parsedResume = pdfData.text;
            } else if (resumeFile.mimetype === 'text/plain') {
                parsedResume = fs.readFileSync(resumeFile.path, 'utf-8');
            } else {
                return res.status(400).json({ success: false, message: 'Unsupported file type' });
            }
        }

        // AI logic for resume improvement
        const messages = [
            { role: 'system', content: 'You are a resume analysis expert.' },
            { role: 'user', content: `Here is a resume text: ${parsedResume}\n\nPlease analyze the resume and provide suggestions for improvement in terms of:\n- Formatting\n- Grammar and language\n- Missing key skills or achievements.` },
        ];

        const response = await openai.chat.completions.create({
            model: 'gpt-4-turbo',
            messages: messages,
            max_tokens: 500,
        });

        const suggestions = response.choices[0].message.content.trim();

        // Format api response
        const formattedSuggestions = formatApiResponse(suggestions);

        res.json({
            success: true,
            formattedSuggestions,
        });
    } catch (error) {
        console.error('Error parsing resume:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to parse resume',
            error: error.message,
        });
    }
});

module.exports = router;