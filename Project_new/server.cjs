const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const bcrypt = require('bcrypt');
const cors = require('cors');
const session = require('express-session');


// Parse request body
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'OPTIONS'],
}));
app.options('*', cors());
app.use(session({
    secret: 'thong diep vu tru',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

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
                // Check if the username already exists
                const existingUser = await db.collection('account').findOne({ username });
                if (existingUser) {
                    return res.status(409).json({ error: 'Username already exists' });
                }

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

        app.post('/lat-bai-tay', async (req, res) => {
            try {
                const db = client.db('52la');

                // Get the 'cards' collection
                const cardsCollection = db.collection('cards');

                // Get 5 random cards from the collection
                const cards = await cardsCollection.aggregate([{ $sample: { size: 5 } }]).toArray();

                // Store the selected cards in the session
                req.session.cards = cards;

                // Send the cards as a response
                res.json(cards);
            } catch (error) {
                console.error('Error fetching cards:', error);
                res.status(500).json({ error: 'Failed to fetch cards' });
            }
        });

        app.post('/lat-bai-tarot', async (req, res) => {
            try {
                const db = client.db('tarot'); // Assuming you have a separate database for Tarot cards

                // Get the 'tarotCards' collection
                const tarotCardsCollection = db.collection('cards');

                // Get 3 random Tarot cards from the collection
                const tarotCards = await tarotCardsCollection.aggregate([{ $sample: { size: 3 } }]).toArray();

                // Store the selected Tarot cards in the session
                req.session.tarotCards = tarotCards;

                // Send the Tarot cards as a response
                res.json(tarotCards);
            } catch (error) {
                console.error('Error fetching Tarot cards:', error);
                res.status(500).json({ error: 'Failed to fetch Tarot cards' });
            }
        });

        app.post('/boi-ngay-sinh', async (req, res) => {
            const { day, month, year } = req.body;
        
            try {
                const boiNgaySinhDb = client.db('BoiNgaySinh');
        
                // Get the zodiac sign
                const zodiacSignsCollection = boiNgaySinhDb.collection('zodiacSigns');
                const zodiacSign = await zodiacSignsCollection.findOne({
                    'Range.start': { $lte: `${day}/${month}` },
                    'Range.end': { $gte: `${day}/${month}` },
                });
        
                // Get the month meaning
                const monthMeaningsCollection = boiNgaySinhDb.collection('ThangSinh');
                const monthMeaning = await monthMeaningsCollection.findOne({ month });
        
                // Get the year meaning
                const yearMeaningsCollection = boiNgaySinhDb.collection('NamSinh');
                const yearMeaning = await yearMeaningsCollection.findOne({ year });
        
                // Get the soChuDao
                const soChuDaoCollection = boiNgaySinhDb.collection('SoChuDao');
                const soChuDao = await soChuDaoCollection.findOne({ day, month, year });
        
                res.json({
                    zodiacSign: zodiacSign.Name,
                    monthMeaning: monthMeaning.meaning,
                    yearMeaning: yearMeaning.meaning,
                    soChuDao: soChuDao.meaning,
                });
            } catch (error) {
                console.error('Error fetching birth date meanings:', error);
                res.status(500).json({ error: 'Failed to fetch birth date meanings' });
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

