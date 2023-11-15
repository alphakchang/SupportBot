import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import path from 'path';

// memoQ plugin imports
import handleGptTranslate from './memoQ-controllers/gptTranslate.js';

dotenv.config();

const app = express();

const openaiApiKey = process.env.OPENAI_API_KEY;
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
	res.json('hello Jorge!')
});

// Serve static files from the React app
const buildPathAlphai = path.join(__dirname, '../SupportAI/build');
app.use('/alphai', express.static(buildPathAlphai));

app.get('/alphai/*', (req, res) => {
	res.sendFile(path.join(buildPathAlphai, 'index.html'));
});

app.get('/', (req, res) => {
	res.send('Server running on Alpha Naga');
});

app.get('/apikey', (req, res) => {
	res.json({ key: openaiApiKey });
});

app.post('/gptTranslate', (req, res) => { handleGptTranslate(req, res) });

app.listen(port, '0.0.0.0', ()=> {
	console.log(`Server running on Naga, port ${port}`);
});