const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    const skills = [
        { id: 1, name: 'React', description: 'JavaScript library for building user interfaces' },
        { id: 2, name: 'Node.js', description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine' },
    ];
    res.json(skills);
});

app.listen(PORT, () => {
    console.log(`Server is running on httpL//localhost:${PORT}`);
});