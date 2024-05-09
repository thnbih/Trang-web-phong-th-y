const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const bcrypt = require("bcrypt");
const cors = require("cors");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { ObjectId } = require("mongodb");
const Groq = require('groq-sdk');
const sharp = require('sharp');
const sdk = require('microsoft-cognitiveservices-speech-sdk');

// Parse request body
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'OPTIONS', 'PATCH'],
  })
);
app.options('*', cors());
app.use(
  session({
    secret: "thong diep vu tru",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(express.json());
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

app.get('/', (req, res) => {
  res.status(200).send('BE of An Nhien!');
})


client.connect()
  .then(() => {
    console.log("Connected to MongoDB");

    const db = client.db("user");

    // API endpoint for user registration
    app.post("/api/register", cors(), async (req, res) => {
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
    app.post("/api/login", cors(), async (req, res) => {
      const { username, password } = req.body;
      // console.log(req.body);

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

        const genneralAccessToken = (payload, secret) => {
          // console.log(`${payload}`);
          const access_token = jwt.sign(payload, secret, {
            expiresIn: "7d",
          });

          return access_token;
        };

        const genneralRefreshToken = (payload, secret) => {
          const refresh_token = jwt.sign(payload, secret, {
            expiresIn: "30d",
          });

          return refresh_token;
        };

        const userSecret = `${process.env.ACCESS_TOKEN}_${username}`;
        const access_token = genneralAccessToken(
          {
            // id: req.body._id,
            username: username,
            password: password
          },
          userSecret
        );

        const refreshUserSecret = `${process.env.REFRESH_TOKEN}_${username}`;
        const refresh_token = genneralRefreshToken(
          {
            // id: req.body._id,
            username: username,
            password: password
          },
          refreshUserSecret
        );

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

    // Middleware to save the API response in the user's session and write to the 'history' collection
    const saveApiResponse = async (req, res, next) => {
      try {
        const { type, result } = req.body;

        // Check if the user is authenticated
        if (!req.session.user) {
          // User is not authenticated, skip saving the response
          next();
          return;
        }

        const userId = req.session.user._id;

        // Save the response in the user's session
        if (!req.session.history) {
          req.session.history = {};
        }
        if (!req.session.history[type]) {
          req.session.history[type] = [];
        }
        req.session.history[type].unshift(result);

        // Write to the 'history' collection in the database
        const historyCollection = db.collection('history');
        const existingHistory = await historyCollection.findOne({ userId });

        if (existingHistory) {
          const updatedHistory = {
            ...existingHistory,
            [type]: [...result, ...existingHistory[type].slice(0, 4)],
          };
          await historyCollection.updateOne({ userId }, { $set: updatedHistory });
        } else {
          const newHistory = { userId, [type]: [result] };
          await historyCollection.insertOne(newHistory);
        }

        next();
      } catch (error) {
        console.error('Error saving API response:', error);
        res.status(500).json({ error: 'Failed to save API response' });
      }
    };

    // Middleware to verify the access token
    const verifyToken = (req, res, next) => {
      const authHeader = req.headers.authorization;

      if (authHeader) {
        const token = authHeader.split(' ')[1];

        // Decode the token to get the payload
        const decodedToken = jwt.decode(token);

        if (decodedToken) {
          const username = decodedToken.username;
          const userSecret = `${process.env.ACCESS_TOKEN}_${username}`;

          // Verify the token using the user-specific secret key
          jwt.verify(token, userSecret, (err, decoded) => {
            if (err) {
              console.error('Error verifying token:', err);
              return res.status(403).json({ error: 'Invalid token' });
            }

            // Token is valid, attach the decoded payload to the request object
            req.user = decoded;
            next();
          });
        } else {
          return res.status(403).json({ error: 'Invalid token' });
        }
      } else {
        res.status(401).json({ error: 'No token provided' });
      }
    };

    // Function to save the API response in the user's session
    const saveApiResponseInUserSession = async (userId, type, result) => {
      try {
        const db = client.db("user");
        const userSession = await db.collection("userSessions").findOne({ userId });
        // console.log(result);

        if (userSession) {
          // User session exists, update the history
          const updatedHistory = {
            ...userSession.history,
            [type]: [
              {
                cardsId: result.cardsId || [],
                summarizedMeaning: result.summarizedMeaning || '',
                timestamp: new Date(),
              },
              ...(userSession.history[type] || []),
            ],
          };

          await db
            .collection("userSessions")
            .updateOne({ userId }, { $set: { history: updatedHistory } });
        } else {
          // User session doesn't exist, create a new one
          const newUserSession = {
            userId,
            history: {
              [type]: [
                {
                  cardsId: result.cardsId || [],
                  summarizedMeaning: result.summarizedMeaning || '',
                  timestamp: new Date(),
                },
              ],
            },
          };

          await db.collection("userSessions").insertOne(newUserSession);
        }
      } catch (error) {
        console.error("Error saving API response in user session:", error);
        throw error;
      }
    };

    // Function to save the API response in the history collection
    const saveApiResponseInHistory = async (userId, type, result) => {
      try {
        const db = client.db("user");
        const history = await db.collection("history").findOne({ userId });

        if (history) {
          // User history exists, update the history
          const updatedHistory = {
            ...history,
            [type]: [...(history[type] || []), result],
          };

          await db
            .collection("history")
            .updateOne({ userId }, { $set: updatedHistory });
        } else {
          // User history doesn't exist, create a new one
          const newHistory = {
            userId,
            [type]: [result],
          };

          await db.collection("history").insertOne(newHistory);
        }
      } catch (error) {
        console.error("Error saving API response in history:", error);
        throw error;
      }
    };

    app.post("/api/lat-bai-tarot-dashboard", cors(), async (req, res) => {
      try {
        const db = client.db("tarot"); // Assuming you have a separate database for Tarot cards

        // Get the 'tarotCards' collection
        const tarotCardsCollection = db.collection("cards");

        // Get 3 random Tarot cards from the collection
        const tarotCards = await tarotCardsCollection
          .aggregate([{ $sample: { size: 1 } }])
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

    app.post("/api/loi-binh-dashboard", cors(), async (req, res) => {
      try {
        const db = client.db("LoiBinh"); // Using LoiBinh database now

        // Get the 'LoiBinh' collection
        const loiBinhCollection = db.collection("LoiBinh");

        // Get 3 random documents from the LoiBinh collection
        const loiBinhItems = await loiBinhCollection
          .aggregate([{ $sample: { size: 3 } }]) // Adjust the size here if you want to get less or more documents
          .toArray();

        // Send the LoiBinh items as a response
        res.json(loiBinhItems);
      } catch (error) {
        console.error("Error fetching LoiBinh documents:", error);
        res.status(500).json({ error: "Failed to fetch LoiBinh documents" });
      }
    });

    const { ObjectId } = require('mongodb');

    async function getCardInfoByCardsIds(cardsIds) {
      try {
        const db = client.db("52la");
        const cardsCollection = db.collection("cards");

        // Convert the input array to a Set to remove duplicates
        const uniqueCardsIds = Array.from(new Set(cardsIds.map(id => new ObjectId(id))));

        // Find cards in the collection with IDs in the uniqueCardsIds set
        const cards = await cardsCollection.find({ _id: { $in: uniqueCardsIds } }).toArray();

        // Map over the cards and convert img to webp
        const cardInfoArray = await Promise.all(
          cards.map(async (card) => {
            const { Name, Mean, img } = card;
            const webpBase64 = await convertToWebP(img);
            return { Name, Mean, img: webpBase64 };
          })
        );

        return cardInfoArray;
      } catch (error) {
        console.error("Error fetching card info:", error);
        throw error;
      }
    }

    async function convertToWebP(imageBinary) {
      const imageBase64 = imageBinary.buffer.toString('base64');

      if (!imageBase64 || typeof imageBase64 !== 'string' || !imageBase64.trim()) {
        console.warn("Invalid image data");
        return null;
      }

      const imageBuffer = Buffer.from(imageBase64, 'base64');
      const webpBuffer = await sharp(imageBuffer).webp().toBuffer();
      const webpBase64 = webpBuffer.toString('base64');
      return webpBase64;
    }

    app.options('/api/lat-bai-tay', cors());
    app.post("/api/lat-bai-tay", cors(), async (req, res) => {
      try {
        const userId = req.body.userId;
        const userDB = client.db("user");

        // Check if the user has an existing session
        const userSession = await userDB.collection("userSessions").findOne({ userId });

        if (userSession && userSession.history && userSession.history["lat-bai-tay"]) {
          // User session exists, and the response for "lat-bai-tay" is available
          const storedResponse = userSession.history["lat-bai-tay"][0];

          // Check if the stored response is older than 24 hours
          const currentTime = new Date();
          const storedResponseTime = new Date(storedResponse.timestamp);
          const timeDiff = currentTime - storedResponseTime;
          const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

          if (timeDiff < oneHour) {
            // Stored response is within 1 hour, send it back to the client
            const uniqueCardsId = [...new Set(storedResponse.cardsId)];
            const firstCardsId = uniqueCardsId.slice(0, 5);
            const cardsInfo = await getCardInfoByCardsIds(firstCardsId);
            res.json({
              cards: cardsInfo,
              summarizedMeaning: storedResponse.summarizedMeaning
            });
            return;
          }
        }

        // If no stored response or the stored response is older than 24 hours, generate a new response
        const db = client.db("52la");
        const cardsCollection = db.collection("cards");
        const cards = await cardsCollection
          .aggregate([{ $sample: { size: 5 } }])
          .toArray();

        const convertedCards = await Promise.all(cards.map(async (card) => {
          const webpBase64 = await convertToWebP(card.img);
          return {
            ...card,
            img: webpBase64,
          };
        }));

        // Save the new response in the user's session
        await saveApiResponseInUserSession(userId, "lat-bai-tay", {
          result: convertedCards,
          // cardsId: convertedCards.map(card => card._id),
          timestamp: new Date(),
        });

        res.json({ cards: convertedCards, summarizedMeaning: "" });
      } catch (error) {
        console.error("Error fetching cards:", error);
        res.status(500).json({ error: "Failed to fetch cards" });
      }
    });

    app.post("/api/lat-bai-tarot", cors(), async (req, res) => {
      try {
        const userId = req.body.userId;
        const userDB = client.db("user");

        // Check if the user has an existing session
        const userSession = await userDB.collection("userSessions").findOne({ userId });

        if (userSession && userSession.history && userSession.history["lat-bai-tarot"]) {
          // User session exists, and the response for "lat-bai-tarot" is available
          const storedResponse = userSession.history["lat-bai-tarot"][0];

          // Check if the stored response is older than 24 hours
          const currentTime = new Date();
          const storedResponseTime = new Date(storedResponse.timestamp);
          const timeDiff = currentTime - storedResponseTime;
          const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

          if (timeDiff < oneHour) {
            // Stored response is within 1 hour, send it back to the client
            res.json({
              tarotCards: storedResponse.result,
              summarizedMeaning: storedResponse.summarizedMeaning
            });
            return;
          }
        }

        // If no stored response or the stored response is older than 24 hours, generate a new response
        const db = client.db("tarot");
        // Get the 'tarotCards' collection
        const tarotCardsCollection = db.collection("cards");

        // Get 3 random Tarot cards from the collection
        const tarotCards = await tarotCardsCollection
          .aggregate([{ $sample: { size: 3 } }])
          .toArray();

        // Save the new response in the user's session
        await saveApiResponseInUserSession(userId, "lat-bai-tarot", {
          result: tarotCards,
          timestamp: new Date(),
        });

        res.json({ tarotCards: tarotCards, summarizedMeaning: "" });
      } catch (error) {
        console.error("Error fetching Tarot cards:", error);
        res.status(500).json({ error: "Failed to fetch Tarot cards" });
      }
    });

    app.options('/api/boi-ngay-sinh', cors());
    app.post("/api/boi-ngay-sinh", cors(), async (req, res) => {
      const { day, month, year, userId } = req.body;

      // Validate the required fields
      if (!day || !month || !year || !userId) {
        return res
          .status(400)
          .json({ error: "Missing required fields: day, month, year, userId" });
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

        const result = {
          day: day,
          month: month,
          year: year,
          zodiacSign: zodiacSign ? zodiacSign.Value : null,
          dayMeaning: dayMeaning ? dayMeaning.Mean : null,
          monthMeaning: monthMeaning ? monthMeaning.Mean : null,
          yearMeaning: yearMeaning ? yearMeaning["Ý nghĩa tuổi"] : null,
          soChuDao: soChuDaoMeaning ? soChuDaoMeaning.Mean : null,
        };

        res.json(result);
      } catch (error) {
        console.error("Error fetching birth date meanings:", error);
        res.status(500).json({ error: "Failed to fetch birth date meanings" });
      }
    });

    app.post('/api/save-response', cors(), verifyToken, async (req, res) => {
      const { userId, type, result } = req.body;

      try {
        // Save the response in the user's session and history collection
        await saveApiResponseInUserSession(userId, type, result);
        await saveApiResponseInHistory(userId, type, result);

        res.status(200).json({ message: 'API response saved successfully' });
      } catch (error) {
        console.error('Error saving API response:', error);
        res.status(500).json({ error: 'Failed to save API response' });
      }
    });

    //detail user
    app.post("/api/detail-user", cors(), async (req, res) => {
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

    app.patch("/api/detail-user", cors(), async (req, res) => {
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

    app.options("/api/synthesize", cors());
    app.post('/api/synthesize', async (req, res) => {
      try {
        const { text } = req.body;

        const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.SPEECH_KEY, process.env.SPEECH_REGION);
        const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();

        speechConfig.speechSynthesisVoiceName = 'vi-VN-NamMinhNeural';

        const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

        const ssml = `<speak version='1.0' xml:lang='en-US'><voice xml:lang='vi-VN' xml:gender='Female' name='vi-VN-NamMinhNeural'>${text}</voice></speak>`;

        synthesizer.speakSsmlAsync(ssml, (result) => {
          if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
            const audioData = result.audioData;
            res.set({
              'Content-Type': 'audio/wav',
              'Content-Disposition': 'attachment; filename="audio.wav"',
              'Content-Length': audioData.byteLength,
            });
            res.send(Buffer.from(audioData));
          } else {
            console.error('Speech synthesis canceled, ' + result.errorDetails);
            res.status(500).send('Speech synthesis failed.');
          }
          synthesizer.close();
        }, (error) => {
          console.error(error);
          synthesizer.close();
        });
      } catch (error) {
        console.error('Error synthesizing speech:', error);
        res.status(500).json({ error: 'Error synthesizing speech' });
      }
    });

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })

  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

const groq = new Groq({
  apiKey: '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'
});

const summarizeCardMeaningsWithGroq = async (cards) => {
  // const cardMeanings = cards.map(card => card.Mean);
  // const concatenatedMeanings = cardMeanings.join(' ');

  const prompt = `Act as a fortune teller for teenagers and middle age. You are an expert in your professional. Your answers should be straightforward and convincing. You must only talk about your profession, nothing else. Your primary language is Vietnamese and you must answer in Vietnamese. Your job is to summarize the meanings of these cards: ${cards} and give the user the message that the cards are trying to tell. You must call the user as 'con' and call yourself 'ta'. Your name is 'Thầy Rùa'. Your answer should always be in plaintext, do not add styling like bold text or anything like that. Try to be as funny as possible. Never call yourself 'tao'.`;

  const chatCompletion = await getGroqChatCompletion(prompt);
  return chatCompletion.choices[0]?.message?.content || '';
};

const summarizeDOBMeaningsWithGroq = async (cards) => {
  const cardMeanings = cards.map(card => card.Mean);
  const concatenatedMeanings = cardMeanings.join(' ');

  const prompt = `Act as a fortune teller for teenagers and middle age. You are an expert in your professional. Your answers should be straightforward and convincing. You must only talk about your profession, nothing else. Your primary language is Vietnamese and you must answer in Vietnamese. Your job is to summarize these meanings: ${concatenatedMeanings} and give the user the overall message. You must call the user as 'con' and call yourself 'ta'. Your name is 'Thầy Rùa'. Your answer should always be in plaintext, do not add styling like bold text or anything like that. Try to be as funny as possible. Never call yourself 'tao'.`;

  const chatCompletion = await getGroqChatCompletion(prompt);
  return chatCompletion.choices[0]?.message?.content || '';
};

async function getGroqChatCompletion(prompt) {
  return groq.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gemma-7b-it',
  });
}

app.options('/api/summarize', cors());
app.post('/api/summarize', async (req, res) => {
  try {
    const cards = req.body;
    const summarizedMeaning = await summarizeCardMeaningsWithGroq(cards);

    res.status(200).json({ summarizedMeaning });
  } catch (error) {
    console.error('Error summarizing card meanings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.options('/api/get-overall-message', cors());
app.post('/api/get-overall-message', async (req, res) => {
  try {
    const meanings = req.body;
    const summarizedMeaning = await summarizeDOBMeaningsWithGroq(meanings);

    res.status(200).json({ summarizedMeaning });
  } catch (error) {
    console.error('Error summarizing card meanings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = app;