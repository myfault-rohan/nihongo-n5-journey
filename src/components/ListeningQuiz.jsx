import React, { useState } from "react";
import { speak } from "../utils/speech";
import VOCAB_N5 from "../data/vocab_n5";
import { theme as THEME } from "../styles/theme";
import { playCorrect, playWrong, playLevelUp } from "../utils/sounds";

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function generateRound() {
  // Use a pool of the first 100 or just fully random from VOCAB_N5.
  // The prompt said "Use 30", so let's pick 30 random words to form a pool, 
  // then take 15 for the round to ensure variety but keep it manageable.
  const pool = shuffle(VOCAB_N5).slice(0, 30);
  const selectedItems = pool.slice(0, 15);

  return selectedItems.map((item) => {
    const wrongs = shuffle(VOCAB_N5.filter(v => v.en !== item.en)).slice(0, 3);
    const options = shuffle([item.en, ...wrongs.map(w => w.en)]);
    return {
      item,
      options,
      answer: item.en
    };
  });
}

export default function ListeningQuiz({ onProgress }) {
  const [questions, setQuestions] = useState([]);
  const [qi, setQi] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  const startRound = () => {
    setQuestions(generateRound());
    setQi(0);
    setSelected(null);
    setScore(0);
    setDone(false);
    setHasPlayed(false);
  };

  const playAudio = () => {
    if (!questions.length) return;
    speak(questions[qi].item.jp);
    setHasPlayed(true);
  };

  const pickAnswer = (opt) => {
    if (selected !== null) return;
    setSelected(opt);
    
    if (opt === questions[qi].answer) {
      setScore((s) => s + 1);
      playCorrect();
    } else {
      playWrong();
    }
  };

  const nextQuestion = () => {
    if (qi + 1 >= questions.length) {
      setDone(true);
      if (onProgress) onProgress(1); // Mark the listening module as complete (1/1)
      if (score >= 12) playLevelUp(); // Level up if score is high
    } else {
      setQi((q) => q + 1);
      setSelected(null);
      setHasPlayed(false);
    }
  };

  // Intro Screen
  if (questions.length === 0) {
    return (
      <div className="fade-up" style={{ paddingBottom: 60 }}>
        <div style={{ marginBottom: 32, textAlign: "center" }}>
          <div style={{ fontSize: 13, letterSpacing: 5, color: THEME.colors.primary, fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>
            Lesson 7
          </div>
          <h2 style={{ fontSize: 32, fontWeight: 900, color: THEME.colors.secondary, margin: "0 0 16px", fontFamily: THEME.fonts.main }}>
            聴解 Listening
          </h2>
          <p style={{ color: THEME.colors.textLight, margin: 0, fontSize: 15 }}>
            Train your ears. 15 questions per round.
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 48 }}>
          <button
            onClick={startRound}
            style={{
              background: THEME.colors.primary,
              color: THEME.colors.white,
              border: "none",
              borderRadius: 30,
              padding: "16px 40px",
              fontSize: 20,
              fontWeight: 900,
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(192, 57, 43, 0.4)",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            ▶ Start Listening Quiz
          </button>
        </div>
      </div>
    );
  }

  // Done Screen
  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    const emoji = pct === 100 ? "🌸" : pct >= 70 ? "✨" : "🎌";
    const msg = pct === 100 ? "完璧！ Perfect score!" : pct >= 70 ? "よくできました！ Great job!" : "がんばって！ Keep practicing!";

    return (
      <div className="fade-up" style={{ paddingBottom: 60 }}>
        <h2 style={{ fontSize: 32, fontWeight: 900, color: THEME.colors.secondary, marginBottom: 32, fontFamily: THEME.fonts.main, textAlign: "center" }}>
          Listening Complete!
        </h2>
        
        <div style={{
          background: THEME.colors.white,
          border: "2px solid #E8E0D5",
          borderRadius: 24,
          padding: 48,
          textAlign: "center",
          maxWidth: 480,
          margin: "0 auto",
          boxShadow: THEME.shadows.card,
        }}>
          <div style={{ fontSize: 96, fontWeight: 900, color: THEME.colors.gold, lineHeight: 1, fontFamily: "'Shippori Mincho', 'Georgia', serif" }}>
            {score}
          </div>
          <div style={{ fontSize: 16, color: THEME.colors.textLight, marginBottom: 8, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2 }}>
            out of {questions.length}
          </div>
          
          <div style={{ height: 10, background: "#E8E0D5", borderRadius: 5, margin: "32px 0", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: THEME.colors.primary, borderRadius: 5 }} />
          </div>
          
          <div style={{ fontSize: 24, marginBottom: 40, color: THEME.colors.secondary, fontWeight: 900 }}>
            {emoji} {msg}
          </div>
          
          <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
            <button onClick={startRound} style={{
              background: THEME.colors.primary,
              color: THEME.colors.white,
              border: "none",
              borderRadius: 30,
              padding: "14px 32px",
              fontSize: 16,
              fontWeight: 900,
              cursor: "pointer",
              transition: "transform 0.2s ease",
            }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[qi];
  const pct = (qi / questions.length) * 100;

  return (
    <div className="fade-up" key={qi} style={{ paddingBottom: 60, maxWidth: 540, margin: "0 auto" }}>
      
      {/* Progress Header */}
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, color: THEME.colors.textLight, marginBottom: 8, fontWeight: 800 }}>
        <span>Question {qi + 1} / {questions.length}</span>
        <span style={{ color: THEME.colors.gold }}>Score: {score}</span>
      </div>
      <div style={{ height: 8, background: "#E8E0D5", borderRadius: 4, overflow: "hidden", marginBottom: 32 }}>
        <div style={{ height: "100%", width: `${pct}%`, background: THEME.colors.primary, borderRadius: 4, transition: "width 0.4s ease" }} />
      </div>

      {/* Main Play Area */}
      <div style={{
        background: THEME.colors.white,
        border: "2px solid #E8E0D5",
        borderRadius: 24,
        padding: "40px 24px",
        textAlign: "center",
        marginBottom: 24,
        boxShadow: THEME.shadows.card,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        
        {/* Play Button */}
        <button
          onClick={playAudio}
          style={{
            background: hasPlayed ? `${THEME.colors.primary}11` : THEME.colors.primary,
            border: hasPlayed ? `2px solid ${THEME.colors.primary}44` : "none",
            borderRadius: "50%",
            width: 100,
            height: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: 48,
            color: hasPlayed ? THEME.colors.primary : THEME.colors.white,
            marginBottom: 24,
            transition: "all 0.2s ease",
            boxShadow: hasPlayed ? "none" : "0 8px 24px rgba(192, 57, 43, 0.4)"
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          title="Play Audio"
        >
          🔊
        </button>

        <div style={{ fontSize: 16, color: THEME.colors.textLight, fontWeight: 700, marginBottom: selected ? 24 : 0 }}>
          {hasPlayed ? "What did you hear?" : "Press Play to listen"}
        </div>

        {/* Reveal Answer (Only shown after selection) */}
        {selected !== null && (
          <div className="fade-up" style={{ 
            background: "#F9F5F0", 
            borderLeft: `4px solid ${THEME.colors.primary}`, 
            padding: "20px", 
            borderRadius: "0 12px 12px 0",
            width: "100%",
            boxSizing: "border-box"
          }}>
            <div style={{ fontSize: 40, fontWeight: 900, color: THEME.colors.secondary, fontFamily: "'Shippori Mincho', 'Georgia', serif", marginBottom: 8 }}>
              {q.item.jp}
            </div>
            <div style={{ fontSize: 14, color: THEME.colors.textLight, fontWeight: 700, marginBottom: 4 }}>
              {q.item.rom}
            </div>
            <div style={{ fontSize: 18, color: THEME.colors.primary, fontWeight: 900 }}>
              {q.item.en}
            </div>
          </div>
        )}
      </div>

      {/* Options */}
      {hasPlayed && (
        <div className="fade-up" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {q.options.map((opt, i) => {
            let state = null;
            if (selected !== null) {
              if (opt === q.answer) state = "correct";
              else if (opt === selected) state = "wrong";
            }
            
            const isCorrect = state === "correct";
            const isWrong = state === "wrong";
            
            return (
              <button
                key={i}
                onClick={() => pickAnswer(opt)}
                style={{
                  width: "100%",
                  padding: "16px 24px",
                  borderRadius: 16,
                  border: `2px solid ${isCorrect ? "#27AE60" : isWrong ? THEME.colors.primary : "#E8E0D5"}`,
                  background: isCorrect ? "#27AE60" : isWrong ? THEME.colors.primary : THEME.colors.white,
                  color: (isCorrect || isWrong) ? THEME.colors.white : THEME.colors.secondary,
                  fontSize: 16,
                  cursor: selected !== null ? "default" : "pointer",
                  textAlign: "left",
                  fontWeight: (isCorrect || isWrong) ? 900 : 700,
                  transition: "all 0.2s ease",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: (isCorrect || isWrong) ? "0 4px 12px rgba(0,0,0,0.1)" : "none",
                }}
                onMouseEnter={e => { 
                  if (selected === null) {
                    e.currentTarget.style.background = "#F9F5F0";
                    e.currentTarget.style.borderColor = THEME.colors.primary;
                  }
                }}
                onMouseLeave={e => { 
                  if (selected === null) {
                    e.currentTarget.style.background = THEME.colors.white;
                    e.currentTarget.style.borderColor = "#E8E0D5";
                  }
                }}
              >
                {opt}
                {isCorrect && <span style={{ fontSize: 20, color: THEME.colors.white }}>✓</span>}
                {isWrong && <span style={{ fontSize: 20, color: THEME.colors.white }}>✗</span>}
              </button>
            );
          })}
        </div>
      )}

      {/* Next Button (Shown after selection) */}
      {selected !== null && (
        <div className="fade-up" style={{ marginTop: 32, textAlign: "center" }}>
          <button
            onClick={nextQuestion}
            style={{
              background: THEME.colors.primary,
              color: THEME.colors.white,
              border: "none",
              borderRadius: 30,
              padding: "14px 40px",
              fontSize: 18,
              fontWeight: 900,
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(192, 57, 43, 0.4)",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            Next Question →
          </button>
        </div>
      )}

    </div>
  );
}
