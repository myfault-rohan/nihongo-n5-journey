const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Load .env file in development
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Pull credentials from environment variables
const AUTH_USERNAME = process.env.AUTH_USERNAME || 'rohan phirke';
const AUTH_PASSWORD = process.env.AUTH_PASSWORD || 'rohan@234';
const AUTH_TOKEN    = process.env.AUTH_TOKEN    || 'rohan-auth-token-xyz';
const FRONTEND_URL  = process.env.FRONTEND_URL  || 'http://localhost:3000';

// Middleware
app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

// Path to our simple JSON database
const dataPath = path.join(__dirname, 'data.json');

// Ensure data file exists with default values
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, JSON.stringify({
    progress: {
      hiragana: 0, katakana: 0, kanji: 0, vocab: 0,
      grammar: 0, reading: 0, listening: 0, mocktest: 0,
    },
    srsData: {},
    theme: 'light'
  }, null, 2));
}

// Read / write helpers
const readData  = () => JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
const writeData = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

// ── Login ────────────────────────────────────────────────────────────────────
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === AUTH_USERNAME && password === AUTH_PASSWORD) {
    res.json({ success: true, token: AUTH_TOKEN });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// ── Auth middleware ───────────────────────────────────────────────────────────
const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token === `Bearer ${AUTH_TOKEN}`) {
    next();
  } else {
    res.status(401).json({ success: false, message: 'Unauthorized' });
  }
};

// ── Get all data ──────────────────────────────────────────────────────────────
app.get('/api/data', requireAuth, (req, res) => {
  res.json({ success: true, data: readData() });
});

// ── Save data ─────────────────────────────────────────────────────────────────
app.post('/api/data', requireAuth, (req, res) => {
  const newData = { ...readData(), ...req.body };
  writeData(newData);
  res.json({ success: true });
});

// ── Health check (useful for Render) ─────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Nihongo backend is running!' });
});

app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
});
