const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const bcrypt = require("bcrypt");
const cors = require("cors");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { ObjectId } = require("mongodb");
dotenv.config();

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
    methods: ["GET", "POST", "OPTIONS", "PATCH"],
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
        await db
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
          const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN, {
            expiresIn: "30s",
          });

          return access_token;
        };

        const genneralRefreshToken = async (payload) => {
          const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN, {
            expiresIn: "365d",
          });

          return refresh_token;
        };

        const access_token = await genneralAccessToken({
          id: user._id,
          isAdmin: true,
        });

        const refresh_token = await genneralRefreshToken({
          id: user._id,
          isAdmin: true,
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

    app.post("/boi-ngay-sinh", async (req, res) => {
      const { day, month, year } = req.body;

      // Validate the required fields
      if (!day || !month || !year) {
        return res
          .status(400)
          .json({ error: "Missing required fields: day, month, year" });
      }

      try {
        const boiNgaySinhDb = client.db("BoiNgaySinh");

        // Get the zodiac sign
        const zodiacSignsCollection = boiNgaySinhDb.collection("CungHoangDao");
        const zodiacSign = await zodiacSignsCollection.findOne({
          Day: parseInt(day),
          Month: parseInt(month),
        });

        const dayMeaningCollection = boiNgaySinhDb.collection("NgaySinh");
        const dayMeaning = await dayMeaningCollection.findOne({
          Day: parseInt(day),
        });

        // Get the month meaning
        const monthMeaningsCollection = boiNgaySinhDb.collection("ThangSinh");
        const monthMeaning = await monthMeaningsCollection.findOne({
          Month: parseInt(month),
        });

        // Get the year meaning
        const yearMeaningsCollection = boiNgaySinhDb.collection("NamSinh");
        const yearMeaning = await yearMeaningsCollection.findOne({
          "Năm sinh": parseInt(year),
        });

        // Calculate the soChuDao
        const dateString = `${day}${month}${year}`;
        const soChuDaoValue = dateString
          .split("")
          .reduce((sum, digit) => sum + parseInt(digit), 0);

        // Get the soChuDao meaning
        const soChuDaoCollection = boiNgaySinhDb.collection("SoChuDao");
        const soChuDaoMeaning = await soChuDaoCollection.findOne({
          Sum: soChuDaoValue,
        });

        res.json({
          zodiacSign: zodiacSign ? zodiacSign.Value : null,
          monthMeaning: monthMeaning ? monthMeaning.Mean : null,
          yearMeaning: yearMeaning ? yearMeaning["Ý nghĩa tuổi"] : null,
          soChuDao: soChuDaoMeaning ? soChuDaoMeaning.Mean : null,
        });
      } catch (error) {
        console.error("Error fetching birth date meanings:", error);
        res.status(500).json({ error: "Failed to fetch birth date meanings" });
      }
    });

    //detail user
    app.post("/api/detail-user", async (req, res) => {
      const { _id } = req.body;
      try {
        const objectId = new ObjectId(_id);
        const user = await db.collection("account").findOne({ _id: objectId });

        if (!user) {
          // User not found
          return res.status(404).json({ error: "User not found" });
        }

        // Send the cards as a response
        res.json(user);
      } catch (error) {
        console.error("Error fetching detail user:", error);
        res.status(500).json({ error: "Failed to fetch detail user" });
      }
    });

    app.patch("/api/detail-user", async (req, res) => {
      const { _id, values } = req.body;
      try {
        // Chuyển đổi chuỗi _id thành ObjectId
        const objectId = new ObjectId(_id);

        // Tạo một object chứa các trường dữ liệu cần cập nhật
        const updateValues = { $set: values };

        // Cập nhật lại các trường dữ liệu của người dùng
        const updatedUser = await db.collection("account").findOneAndUpdate(
          { _id: objectId },
          updateValues,
          { returnOriginal: false } // Trả về bản ghi sau khi đã cập nhật
        );

        // Gửi lại thông tin người dùng sau khi cập nhật
        res.json(updatedUser.value);
      } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Failed to update user" });
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