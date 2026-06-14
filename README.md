# 🎌 Nihongo N5 Journey

![Nihongo Dashboard](brain/114b3402-d731-42f2-a1dd-b5490c05c1a4/v2_home_1781355791707.png)

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

## 📸 Features Gallery

| Writing Practice ✍️ | Sentence Builder 🧩 |
| :---: | :---: |
| ![Writing](brain/114b3402-d731-42f2-a1dd-b5490c05c1a4/v2_writing_1781355819024.png) | ![Builder](brain/114b3402-d731-42f2-a1dd-b5490c05c1a4/v2_builder_1781355847542.png) |
| **Trace characters over a ghost guide with an interactive ink brush algorithm.** | **Drag and drop words to form context-heavy grammar sentences.** |

| Spaced Repetition 🃏 | Shadowing Practice 🗣️ |
| :---: | :---: |
| ![SRS](brain/114b3402-d731-42f2-a1dd-b5490c05c1a4/v2_flashcard_srs_1781355879161.png) | ![Shadowing](brain/114b3402-d731-42f2-a1dd-b5490c05c1a4/v2_shadowing_1781355833429.png) |
| **Grade your flashcards and clear your "Today's Review" queue every day.** | **Adjust audio speed and speak along to train your pronunciation rhythm.** |

---

## 🛠️ Architecture

- **Frontend:** React.js, Context API, CSS-in-JS (Vanilla styles).
- **Backend:** Node.js, Express.js.
- **Database:** Local JSON File (`data.json`) for simple, secure, single-user persistence.
- **Audio:** Web Speech API (TTS) and Web Audio API (Oscillators).

---

## 🚀 Getting Started

### Prerequisites
You need [Node.js](https://nodejs.org/) installed on your machine.

### Installation
1. Clone the repository and navigate to the project directory:
   ```bash
   cd japanese-learn
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. *(Optional)* The app comes with a single-user login system to protect your progress. The default credentials are:
   - **Username:** `rohan phirke`
   - **Password:** `rohan@234`

### Running the App
To run both the React frontend (port 3000) and the Node backend (port 3001) simultaneously, use the dev command:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to begin your journey!

---

*“A journey of a thousand miles begins with a single step.” — がんばって！*
