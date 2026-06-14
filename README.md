# 🎌 Nihongo N5 Journey

A comprehensive, scientifically-backed React application for mastering the Japanese Language Proficiency Test (JLPT) N5. Designed for learners who want more than just gamification, it combines traditional aesthetic principles with rigorous cognitive science tools.

---

## 🌟 The Philosophy

This project was built on two core pillars:

### 1. Design That Feels Alive 🌙
Learning a language shouldn't feel like using a spreadsheet. The app uses a premium "Lacquerware" aesthetic with deep charcoal, crimson reds, and gold accents.
- **Dynamic Dark Mode:** A stunning dark theme toggle that persists across sessions.
- **Generative Audio:** Uses the Web Audio API to create mathematically-generated chimes and feedback sounds without heavy MP3 dependencies.
- **Immersive Details:** Features floating "firefly/ember" particles and uses Google's elegant `Noto Serif JP` for all Japanese text.

### 2. Methods That Actually Work 🧠
Moving beyond basic multiple-choice quizzes, we implemented techniques used by successful polyglots:
- **Active Recall Spaced Repetition (SRS):** Flashcards schedule themselves for review (1 min, 10 min, 1 day, 3 days) based on how hard you found them.
- **Shadowing Practice:** Listen to native sentences and speak over them simultaneously to train your mouth's motor memory.
- **Sentence Builder:** Drag-and-drop tiles to practice Japanese's Subject-Object-Verb (SOV) sentence structure.
- **Kinesthetic Writing:** Draw Hiragana and Katakana directly onto an HTML5 Canvas that simulates ink flow.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔤 Hiragana & Katakana | Full character chart with audio pronunciation |
| 🀄 Kanji | N5 Kanji with meanings, readings & stroke guides |
| 📚 Vocabulary | 800+ N5 words with spaced repetition flashcards |
| 📝 Grammar | Structured N5 grammar lessons with examples |
| ✍️ Writing Practice | Draw characters on an interactive ink-brush canvas |
| 📖 Reading | Graded N5 reading passages with comprehension checks |
| 🎧 Listening | Audio-based listening comprehension quizzes |
| 🗣️ Shadowing | Speak along with native audio to train pronunciation |
| 🧩 Sentence Builder | Drag-and-drop SOV sentence construction |
| 🃏 Flashcards | SRS-powered vocab review with difficulty grading |
| 📊 Mock Test | Full timed JLPT N5 mock exam with scoring |
| 🌙 Dark Mode | Premium dark theme that persists across sessions |

---

## 🛠️ Architecture

- **Frontend:** React.js, Context API, CSS-in-JS (Vanilla styles)
- **Backend:** Node.js, Express.js (Vercel Serverless Functions in production)
- **Persistence:** `localStorage` for progress & SRS data
- **Audio:** Web Speech API (TTS) and Web Audio API (Oscillators)
- **Deployment:** Vercel (frontend + serverless API)

---

## 🚀 Getting Started

### Prerequisites
You need [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/myfault-rohan/nihongo-n5-journey.git
   cd nihongo-n5-journey
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables by copying the example file:
   ```bash
   cp .env.example .env
   ```
   Then open `.env` and set your own `AUTH_USERNAME`, `AUTH_PASSWORD`, and `AUTH_TOKEN`.

### Running Locally

To run both the React frontend (port 3000) and the Node backend (port 3001) simultaneously:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to begin your journey!

---

## ☁️ Deploying to Vercel

1. Push this repo to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Add the following **Environment Variables** in your Vercel project settings:

   | Variable | Description |
   |---|---|
   | `AUTH_USERNAME` | Your login username |
   | `AUTH_PASSWORD` | Your login password |
   | `AUTH_TOKEN` | A secret token string |

4. Deploy — Vercel will automatically run `npm run build` and serve the app.

---

*"A journey of a thousand miles begins with a single step." — がんばって！*
