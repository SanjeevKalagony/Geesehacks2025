const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const resumeRoutes = require('./resume');
//const LoginRoutes = require('./registerlogin');
const interviewRoutes = require('./interview');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Home Page Route
app.get("/", (req, res) => {
    const skills = [
        { id: 1, name: 'Get your Resume Critiqued', description: 'Analyze your resume and get suggestions by AI' },
        { id: 2, name: 'LinkedIn Profile improvement', description: 'Get suggestions for your linkedin profile' },
        { id: 3, name: 'GitHub Profile Improvement', description: 'Get suggestions for your GitHub profile' },
        { id: 4, name: 'Interview Preparation', description: 'Get questions and answers for your upcoming interview' },
        { id: 5, name: 'Sign Out', description: 'Sign out from the application' }
    ];
    res.json(skills);
});

// Login routes
//app.use('/api', LoginRoutes);

// Resume Route
app.use('/api', resumeRoutes);

// Interview Route
app.use('/api', interviewRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


/*
curl -X POST "http://localhost:4000/api/improve-resume" \
     -H "Content-Type: multipart/form-data" \
     -F "resume=@/Users/rachna/Dossier/dossier-privé/résumé/RachnaPoonitResumeJan24.pdf"
     */