const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const bcrypt = require('bcrypt');

// MongoDB connection string
const connectionString = 'mongodb+srv://keandk:keandk12@cluster0.y4i0459.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
const client = new MongoClient(connectionString, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

client.connect()
    .then(() => {
        console.log('Connected to MongoDB');

        const db = client.db('user');

        // API endpoint for user registration
        app.post('/api/register', async (req, res) => {
            const { username, password } = req.body;

            try {
                // Hash the password
                const saltRounds = 10; // Adjust the number of salt rounds as needed
                const hashedPassword = await bcrypt.hash(password, saltRounds);

                // Insert user data into MongoDB with the hashed password
                const result = await db.collection('account').insertOne({ username, password: hashedPassword });

                // Handle successful registration
                res.status(200).json({ message: 'Registration successful' });
            } catch (error) {
                // Handle registration error
                console.error(error);
                res.status(500).json({ error: 'Registration failed' });
            }
        });

        // API endpoint for user login
        app.post('/api/login', async (req, res) => {
            const { username, password } = req.body;

            try {
                // Find the user in the database
                const user = await db.collection('account').findOne({ username });

                if (!user) {
                    // User not found
                    return res.status(404).json({ error: 'User not found' });
                }

                // Compare the provided password with the hashed password
                const isPasswordValid = await bcrypt.compare(password, user.password);

                if (!isPasswordValid) {
                    // Invalid password
                    return res.status(401).json({ error: 'Invalid password' });
                }

                // Login successful
                res.status(200).json({ message: 'Login successful' });
            } catch (error) {
                // Handle login error
                console.error(error);
                res.status(500).json({ error: 'Login failed' });
            }
        });

        // Start the server
        app.listen(5000, () => {
            console.log('Server is running on port 5000');
        });
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });
