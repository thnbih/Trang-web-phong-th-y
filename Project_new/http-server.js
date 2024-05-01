import http from 'http';
import querystring from 'querystring';
import url from 'url';
import Groq from 'groq-sdk';

const groq = new Groq({
    apiKey: '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'
});

const summarizeCardMeaningsWithGroq = async (cards) => {
    const cardMeanings = cards.map(card => card.Mean);
    const concatenatedMeanings = cardMeanings.join(' ');

    const prompt = `Act as a fortune teller for teenagers and middle age. You are an expert in your professional. Your answers should be straightforward and convincing. You must only talk about your profession, nothing else. Your primary language is Vietnamese and you must answer in Vietnamese. Your job is to summarize the meanings of these cards: ${concatenatedMeanings} and give the user the message that the cards are trying to tell. You must call the user as 'con'. Your name is 'Thầy Rùa'.`;

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

// Define the HTTP server
const server = http.createServer();
const hostname = '127.0.0.1';
const port = 3000;

// Enable CORS
const allowedOrigins = ['http://localhost:5173']; // Add the origins you want to allow

// Listen for requests made to the server
server.on('request', async (req, res) => {
    // Parse the request URL
    const parsedUrl = url.parse(req.url);

    // Set CORS headers
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.statusCode = 204;
        res.end();
        return;
    }

    if (req.method === 'POST' && parsedUrl.pathname === '/summarize') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const cards = JSON.parse(body);
                const summarizedMeaning = await summarizeCardMeaningsWithGroq(cards);

                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                res.end(JSON.stringify({ summarizedMeaning }));
            } catch (error) {
                console.error('Error summarizing card meanings:', error);
                res.statusCode = 500;
                res.end('Internal Server Error');
            }
        });
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});