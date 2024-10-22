const express = require('express');
const path = require('path');
const { connectToDatabase } = require('./mongo');
const bcrypt = require('bcrypt');
require('dotenv').config();
const app = express();
const port = 3000;
const saltRounds = 10;  // Number of salt rounds for password hashing

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "assets" directory
app.use(express.static(path.join(__dirname, '../javascript')));

// Serve homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../javascript/index.html'));
});

// Route for user signup
app.post('/addUser', async (req, res) => {
    const { username, password } = req.body;

    // Validate user input
    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username and password are required.' });
    }

    try {
        const db = await connectToDatabase();
        const users = db.collection('Users');

        // Check if the username already exists
        const existingUser = await users.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Username already exists' });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Prepare user data
        const userData = {
            username,
            password: hashedPassword,
            balance: 0,
            stash: [],
            time: 10,
        };

        // Insert the new user into the database
        await users.insertOne(userData);
        res.status(201).json({ success: true });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Route for user login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Validate user input
    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username and password are required.' });
    }

    try {
        const db = await connectToDatabase();
        const users = db.collection('Users');

        // Check if the user exists
        const user = await users.findOne({ username });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        // Successful login
        console.log("User logged in:", username);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Global error handler middleware
app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 400,
        message: { err: 'An error occurred, global handler' },
    };
    const errorObj = Object.assign(defaultErr, err);
    console.error(errorObj.log);
    res.status(errorObj.status).send(JSON.stringify(errorObj.message));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
