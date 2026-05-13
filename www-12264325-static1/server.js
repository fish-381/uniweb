const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON and static files
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Handle POST requests for form submission
app.post('/submit', (req, res) => {
    const { fullName, email, message } = req.body;

    // Validate the incoming data
    if (!fullName || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Echo back the submitted data as confirmation
    const response = {
        status: 'success',
        message: 'Form submitted successfully',
        fullName: fullName,
        email: email,
        message: message,
        timestamp: new Date().toISOString()
    };

    console.log('Form submitted:', response);
    res.json(response);
});

// Serve the main index page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log('The website is ready to handle form submissions!');
});
