const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const bcrypt = require("bcrypt");
const cors = require("cors");
const session = require("express-session");
const http = require("http");
const querystring = require("querystring");
const url = require("url");
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config()

class MySummarizationPipeline {
  static task = "summarization";
  static model = "Xenova/distilbart-cnn-6-6";
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      // Dynamically import the Transformers.js library
      let { pipeline, env } = await import("@xenova/transformers");

      // NOTE: Uncomment this to change the cache directory
      // env.cacheDir = './.cache';

      this.instance = pipeline(this.task, this.model, { progress_callback });
    }

    return this.instance;
  }
}

const summarizeCardMeanings = async (cards) => {
  const summarizationPipeline = await MySummarizationPipeline.getInstance();

  const cardMeanings = cards.map((card) => card.meaning);
  const concatenatedMeanings = cardMeanings.join(" ");

  const summarizedMeaning = await summarizationPipeline(concatenatedMeanings);

  return summarizedMeaning;
};

// Parse request body
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
  })
);
app.options("*", cors());
app.use(
  session({
    secret: "thong diep vu tru",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// MongoDB connection string
const connectionString =
  "mongodb+srv://keandk:keandk12@cluster0.y4i0459.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
const client = new MongoClient(connectionString, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB");

    const db = client.db("user");

    // API endpoint for user registration
    app.post("/api/register", async (req, res) => {
      const { username, password } = req.body;

      try {
        // Check if the username already exists
        const existingUser = await db
          .collection("account")
          .findOne({ username });
        if (existingUser) {
          return res.status(409).json({ error: "Username already exists" });
        }

        // Hash the password
        const saltRounds = 10; // Adjust the number of salt rounds as needed
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert user data into MongoDB with the hashed password
        const result = await db
          .collection("account")
          .insertOne({ username, password: hashedPassword });

        // Handle successful registration
        res.status(200).json({ message: "Registration successful" });
      } catch (error) {
        // Handle registration error
        console.error(error);
        res.status(500).json({ error: "Registration failed" });
      }
    });

    // API endpoint for user login
    app.post("/api/login", async (req, res) => {
      const { username, password } = req.body;
      try {
        // Find the user in the database
        const user = await db.collection("account").findOne({ username });

        if (!user) {
          // User not found
          return res.status(404).json({ error: "User not found" });
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          // Invalid password
          return res.status(401).json({ error: "Invalid password" });
        }

        const genneralAccessToken = async (payload) => {
            console.log(payload)
          const access_token = jwt.sign(
            {
              ...payload,
            },
            process.env.ACCESS_TOKEN,
            { expiresIn: "30s" }
          );

          return access_token;
        };

        const genneralRefreshToken = async (payload) => {
          const refresh_token = jwt.sign(
            {
              ...payload,
            },
            process.env.REFRESH_TOKEN,
            { expiresIn: "365d" }
          );

          return refresh_token;
        };

        const access_token = await genneralAccessToken({
          id: user._id,
          isAdmin: "true"
        });

        const refresh_token = await genneralRefreshToken({
            id: user._id,
          isAdmin: "true"
        });

        // Login successful, return message and user
        res.status(200).json({
          message: "Login successful",
          data: {
            user: user,
            access_token: access_token,
            refresh_token: refresh_token,
          },
        });
        console.log(res);
      } catch (error) {
        // Handle login error
        console.error(error);
        res.status(500).json({ error: "Login failed" });
      }
    });

    app.post("/lat-bai-tay", async (req, res) => {
      try {
        const db = client.db("52la");

        // Get the 'cards' collection
        const cardsCollection = db.collection("cards");

        // Get 5 random cards from the collection
        const cards = await cardsCollection
          .aggregate([{ $sample: { size: 5 } }])
          .toArray();

        // Store the selected cards in the session
        req.session.cards = cards;

        // Send the cards as a response
        res.json(cards);
      } catch (error) {
        console.error("Error fetching cards:", error);
        res.status(500).json({ error: "Failed to fetch cards" });
      }
    });

    app.post("/lat-bai-tarot", async (req, res) => {
      try {
        const db = client.db("tarot"); // Assuming you have a separate database for Tarot cards

        // Get the 'tarotCards' collection
        const tarotCardsCollection = db.collection("cards");

        // Get 3 random Tarot cards from the collection
        const tarotCards = await tarotCardsCollection
          .aggregate([{ $sample: { size: 3 } }])
          .toArray();

        // Store the selected Tarot cards in the session
        req.session.tarotCards = tarotCards;

        // Send the Tarot cards as a response
        res.json(tarotCards);
      } catch (error) {
        console.error("Error fetching Tarot cards:", error);
        res.status(500).json({ error: "Failed to fetch Tarot cards" });
      }
    });

    // Start the server
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Define the HTTP server
const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/summarize") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      try {
        const cards = JSON.parse(body);
        const summarizedMeaning = await summarizeCardMeanings(cards);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ summarizedMeaning }));
      } catch (error) {
        console.error("Error summarizing card meanings:", error);
        res.statusCode = 500;
        res.end("Internal Server Error");
      }
    });
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});

const hostname = "127.0.0.1";
const port = 3000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});