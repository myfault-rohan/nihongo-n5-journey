import React, { useState } from "react";
import { speak } from "../utils/speech";
import HIRAGANA from "../data/hiragana";
import KATAKANA from "../data/katakana";
import VOCAB_N5 from "../data/vocab_n5";
import { theme as THEME } from "../styles/theme";
import { playCorrect, playWrong, playLevelUp } from "../utils/sounds";

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildQuestions(items, getQuestion, getAnswer, getOptions) {
  return shuffle(items).slice(0, 10).map((item) => {
    const wrongs = shuffle(items.filter((x) => x !== item)).slice(0, 3);
    const options = shuffle([item, ...wrongs]);
    return { item, question: getQuestion(item), answer: getAnswer(item), options: options.map(getOptions) };
  });
}

const MODES = [
  { id: "hiragana", label: "あ Hiragana", desc: "Identify the romaji for each hiragana character" },
  { id: "katakana", label: "ア Katakana", desc: "Identify the romaji for each katakana character" },
  { id: "vocab_jp", label: "語 JP→EN", desc: "Translate Japanese words to English" },
  { id: "vocab_en", label: "語 EN→JP", desc: "Translate English words to Japanese" },
];

export default function Quiz() {
  const [mode, setMode] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [qi, setQi] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const start = (m) => {
    let qs;
    if (m === "hiragana") {
      qs = buildQuestions(HIRAGANA, (h) => h.char, (h) => h.rom, (h) => h.rom);
    } else if (m === "katakana") {
      qs = buildQuestions(KATAKANA, (h) => h.char, (h) => h.rom, (h) => h.rom);
    } else if (m === "vocab_jp") {
      qs = buildQuestions(VOCAB_N5, (v) => v.jp, (v) => v.en, (v) => v.en);
    } else {
      qs = buildQuestions(VOCAB_N5, (v) => v.en, (v) => v.jp, (v) => v.jp);
    }
    setMode(m);
    setQuestions(qs);
    setQi(0);
    setSelected(null);
    setScore(0);
    setDone(false);
  };

  const pick = (opt) => {
    if (selected !== null) return;
    setSelected(opt);
    const correct = questions[qi].answer;
    if (opt === correct) {
      setScore((s) => s + 1);
      playCorrect();
    } else {
      playWrong();
    }
    
    // Speak the correct answer item
    const item = questions[qi].item;
    if (mode === "hiragana" || mode === "katakana") speak(item.char);
    else speak(item.jp);

    setTimeout(() => {
      if (qi + 1 >= questions.length) {
        setDone(true);
        if (score + (opt === correct ? 1 : 0) >= 8) playLevelUp();
      }
      else { setQi((q) => q + 1); setSelected(null); }
    }, 1200);
  };

  const modeInfo = MODES.find((m) => m.id === mode);

  // Mode select screen
  if (!mode) return (
    <div className="fade-up" style={{ paddingBottom: 60 }}>
      <div style={{ marginBottom: 32, textAlign: "center" }}>
        <div style={{ fontSize: 13, letterSpacing: 5, color: THEME.colors.primary, fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>
          Challenge
        </div>
        <h2 style={{ fontSize: 32, fontWeight: 900, color: THEME.colors.secondary, margin: "0 0 16px", fontFamily: THEME.fonts.main }}>
          📝 Quiz Time
        </h2>
        <p style={{ color: THEME.colors.textLight, margin: 0, fontSize: 15 }}>
          Test your knowledge! 10 questions per round.
        </p>
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
        {MODES.map((m, i) => (
          <div
            key={m.id}
            onClick={() => start(m.id)}
            className="fade-up"
            style={{
              background: THEME.colors.white,
              border: "2px solid #E8E0D5",
              borderRadius: 16,
              padding: "32px 20px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              animationDelay: `${i * 0.05}s`,
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
              textAlign: "center"
            }}
            onMouseEnter={e => { 
              e.currentTarget.style.borderColor = THEME.colors.primary; 
              e.currentTarget.style.transform = "translateY(-4px)"; 
              e.currentTarget.style.boxShadow = THEME.shadows.floating; 
            }}
            onMouseLeave={e => { 
              e.currentTarget.style.borderColor = "#E8E0D5"; 
              e.currentTarget.style.transform = "translateY(0)"; 
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.03)"; 
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 16, color: THEME.colors.primary, fontWeight: 900 }}>{m.label}</div>
            <div style={{ fontSize: 14, color: THEME.colors.textLight, fontWeight: 600 }}>{m.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );

  // Done screen
  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    const emoji = pct === 100 ? "🌸" : pct >= 70 ? "✨" : "🎌";
    const msg = pct === 100 ? "完璧！ Perfect score!" : pct >= 70 ? "よくできました！ Great job!" : "がんばって！ Keep practicing!";
    
    return (
      <div className="fade-up" style={{ paddingBottom: 60 }}>
        <h2 style={{ fontSize: 32, fontWeight: 900, color: THEME.colors.secondary, marginBottom: 32, fontFamily: THEME.fonts.main, textAlign: "center" }}>
          Quiz Complete!
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
            <button onClick={() => start(mode)} style={btnStyle(THEME.colors.primary, THEME.colors.white, THEME.colors.primary)}>Try Again</button>
            <button onClick={() => setMode(null)} style={btnStyle("transparent", THEME.colors.textLight, "#E8E0D5")}>← Modes</button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz question
  const q = questions[qi];
  const pct = (qi / questions.length) * 100;

  return (
    <div className="fade-up" key={qi} style={{ paddingBottom: 60 }}>
      {/* Header */}
      <div style={{ marginBottom: 32, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontSize: 24, fontWeight: 900, color: THEME.colors.primary, margin: 0, fontFamily: THEME.fonts.main }}>
          {modeInfo?.label}
        </h2>
        <button 
          onClick={() => setMode(null)} 
          style={{ background: "none", border: "none", color: THEME.colors.textLight, cursor: "pointer", fontSize: 14, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1 }}
          onMouseEnter={e => e.currentTarget.style.color = THEME.colors.primary}
          onMouseLeave={e => e.currentTarget.style.color = THEME.colors.textLight}
        >
          ✕ Exit
        </button>
      </div>

      <div style={{ maxWidth: 540, margin: "0 auto" }}>
        {/* Progress */}
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, color: THEME.colors.textLight, marginBottom: 8, fontWeight: 800 }}>
          <span>Question {qi + 1} / {questions.length}</span>
          <span style={{ color: THEME.colors.gold }}>Score: {score}</span>
        </div>
        <div style={{ height: 8, background: "#E8E0D5", borderRadius: 4, overflow: "hidden", marginBottom: 32 }}>
          <div style={{ height: "100%", width: `${pct}%`, background: THEME.colors.primary, borderRadius: 4, transition: "width 0.4s ease" }} />
        </div>

        {/* Question Card */}
        <div style={{
          background: THEME.colors.white,
          border: "2px solid #E8E0D5",
          borderRadius: 24,
          padding: "48px 24px",
          textAlign: "center",
          marginBottom: 32,
          boxShadow: THEME.shadows.card,
        }}>
          <div style={{ fontSize: 15, color: THEME.colors.textLight, marginBottom: 20, fontWeight: 800 }}>
            {mode === "hiragana" || mode === "katakana" ? "What is the romaji for:" : mode === "vocab_jp" ? "What does this mean?" : "How do you say this in Japanese?"}
          </div>
          <div style={{ 
            fontSize: 72, 
            fontWeight: 900, 
            color: THEME.colors.secondary, 
            lineHeight: 1.1,
            fontFamily: "'Shippori Mincho', 'Georgia', serif" 
          }}>
            {q.question}
          </div>
          
          <button
            onClick={() => speak(q.item.jp || q.item.char)}
            style={{ 
              marginTop: 24, 
              background: "transparent",
              border: "none",
              cursor: "pointer", 
              color: THEME.colors.primary, 
              fontSize: 24, 
              transition: "transform 0.2s ease"
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.2)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            title="Hear Pronunciation"
          >
            🔊
          </button>
        </div>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
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
                onClick={() => pick(opt)}
                style={{
                  width: "100%",
                  padding: "20px 24px",
                  borderRadius: 16,
                  border: `2px solid ${isCorrect ? "#27AE60" : isWrong ? THEME.colors.primary : "#E8E0D5"}`,
                  background: isCorrect ? "#27AE60" : isWrong ? THEME.colors.primary : THEME.colors.white,
                  color: (isCorrect || isWrong) ? THEME.colors.white : THEME.colors.secondary,
                  fontSize: 18,
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
                {isCorrect && <span style={{ fontSize: 24, color: THEME.colors.white }}>✓</span>}
                {isWrong && <span style={{ fontSize: 24, color: THEME.colors.white }}>✗</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function btnStyle(bg, color, border) {
  return {
    padding: "14px 32px",
    borderRadius: 30,
    border: `2px solid ${border}`,
    background: bg,
    color,
    fontWeight: 900,
    fontSize: 16,
    cursor: "pointer",
    transition: "all 0.2s ease",
  };
}
