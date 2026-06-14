import React, { useState } from "react";
import READING_N5 from "../data/reading_n5";
import { speak } from "../utils/speech";
import { theme as THEME } from "../styles/theme";

export default function Reading({ onProgress }) {
  const [idx, setIdx] = useState(0);
  const [showRomaji, setShowRomaji] = useState(false);
  const [showTrans, setShowTrans] = useState(false);
  
  // Track answers for the CURRENT passage: { [qIndex]: selectedOption }
  const [answers, setAnswers] = useState({});
  // Track which passage IDs are fully completed
  const [completed, setCompleted] = useState(new Set());

  const passage = READING_N5[idx];

  const next = () => {
    setIdx((i) => (i + 1) % READING_N5.length);
    resetCard();
  };

  const prev = () => {
    setIdx((i) => (i - 1 + READING_N5.length) % READING_N5.length);
    resetCard();
  };

  const resetCard = () => {
    setShowRomaji(false);
    setShowTrans(false);
    setAnswers({});
  };

  const pickAnswer = (qIndex, opt) => {
    if (answers[qIndex]) return; // prevent changing after selection
    
    const nextAnswers = { ...answers, [qIndex]: opt };
    setAnswers(nextAnswers);

    // Check if both questions are answered correctly
    if (
      nextAnswers[0] === passage.questions[0].answer &&
      nextAnswers[1] === passage.questions[1].answer
    ) {
      if (!completed.has(passage.id)) {
        setCompleted((prev) => {
          const newSet = new Set(prev).add(passage.id);
          if (onProgress) onProgress(newSet.size);
          return newSet;
        });
      }
    }
  };

  const isCompleted = completed.has(passage.id);
  const pct = (completed.size / READING_N5.length) * 100;

  return (
    <div className="fade-up" style={{ paddingBottom: 60 }}>
      {/* Header */}
      <div style={{ marginBottom: 32, textAlign: "center" }}>
        <div style={{ fontSize: 13, letterSpacing: 5, color: THEME.colors.primary, fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>
          Lesson 6
        </div>
        <h2 style={{ fontSize: 32, fontWeight: 900, color: THEME.colors.secondary, margin: "0 0 16px", fontFamily: THEME.fonts.main }}>
          読解 Reading
        </h2>
        <p style={{ color: THEME.colors.textLight, margin: 0, fontSize: 14 }}>
          {completed.size} / {READING_N5.length} passages completed · JLPT N5
        </p>
        
        {/* Progress Bar */}
        <div style={{ height: 10, background: "#E8E0D5", borderRadius: 5, overflow: "hidden", marginTop: 24, maxWidth: 400, margin: '24px auto 0' }}>
          <div style={{
            height: "100%",
            width: `${pct}%`,
            background: THEME.colors.primary,
            borderRadius: 5,
            transition: "width 0.4s ease",
          }} />
        </div>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        {/* Navigation & Passage Info */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 14, color: THEME.colors.textLight, fontWeight: 800 }}>
            PASSAGE {idx + 1} OF {READING_N5.length}
          </div>
          {isCompleted && (
            <div style={{ 
              background: THEME.colors.primary, 
              color: THEME.colors.white, 
              padding: "4px 12px", 
              borderRadius: 20, 
              fontSize: 12, 
              fontWeight: 800,
              boxShadow: "0 2px 8px rgba(192, 57, 43, 0.3)"
            }}>
              ✓ COMPLETED
            </div>
          )}
        </div>

        {/* The Passage Card */}
        <div key={passage.id} className="fade-up" style={{
          background: THEME.colors.white,
          border: "2px solid #E8E0D5",
          borderRadius: 20,
          padding: "32px",
          boxShadow: THEME.shadows.card,
          marginBottom: 32,
          position: "relative"
        }}>
          <h3 style={{ fontSize: 24, fontWeight: 900, color: THEME.colors.secondary, marginTop: 0, marginBottom: 24, borderBottom: "2px dashed #E8E0D5", paddingBottom: 16 }}>
            {passage.title}
          </h3>

          {/* Japanese Text */}
          <div style={{ position: "relative" }}>
            <div style={{ 
              fontSize: 22, 
              lineHeight: 1.8, 
              color: THEME.colors.secondary,
              fontWeight: 700,
              fontFamily: "'Shippori Mincho', 'Georgia', serif",
              marginBottom: 24
            }}>
              {passage.japanese}
            </div>

            <button
              onClick={() => speak(passage.japanese)}
              style={{
                position: "absolute",
                top: -64,
                right: 0,
                background: `${THEME.colors.primary}11`,
                border: "none",
                borderRadius: "50%",
                width: 44,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: 20,
                color: THEME.colors.primary,
                transition: "all 0.2s ease"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "scale(1.1)";
                e.currentTarget.style.background = `${THEME.colors.primary}22`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.background = `${THEME.colors.primary}11`;
              }}
              title="Hear Passage"
            >
              🔊
            </button>
          </div>

          {/* Toggles */}
          <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
            <button 
              onClick={() => setShowRomaji(!showRomaji)}
              style={toggleBtnStyle(showRomaji)}
            >
              {showRomaji ? "Hide Romaji" : "Show Romaji"}
            </button>
            <button 
              onClick={() => setShowTrans(!showTrans)}
              style={toggleBtnStyle(showTrans)}
            >
              {showTrans ? "Hide Translation" : "Show Translation"}
            </button>
          </div>

          {/* Romaji Reveal */}
          {showRomaji && (
            <div className="fade-up" style={{
              background: "#f9f9f9",
              padding: "16px",
              borderRadius: 8,
              borderLeft: "4px solid #888",
              marginBottom: 16,
              fontSize: 15,
              color: "#555",
              lineHeight: 1.6,
              fontStyle: "italic"
            }}>
              {passage.romaji}
            </div>
          )}

          {/* Translation Reveal */}
          {showTrans && (
            <div className="fade-up" style={{
              background: `${THEME.colors.primary}08`,
              padding: "16px",
              borderRadius: 8,
              borderLeft: `4px solid ${THEME.colors.primary}`,
              marginBottom: 16,
              fontSize: 16,
              color: THEME.colors.secondary,
              lineHeight: 1.6,
              fontWeight: 600
            }}>
              {passage.translation}
            </div>
          )}
        </div>

        {/* Questions */}
        <h4 style={{ fontSize: 18, color: THEME.colors.primary, fontWeight: 900, marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>
          Comprehension Questions
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 40 }}>
          {passage.questions.map((q, qIndex) => (
            <div key={qIndex} style={{
              background: THEME.colors.white,
              border: "1.5px solid #E8E0D5",
              borderRadius: 16,
              padding: "24px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
            }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: THEME.colors.secondary, marginBottom: 16 }}>
                <span style={{ color: THEME.colors.primary, marginRight: 8 }}>Q{qIndex + 1}.</span> 
                {q.question}
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {q.options.map((opt, i) => {
                  const isSelected = answers[qIndex] === opt;
                  const isAnswered = !!answers[qIndex];
                  const isCorrectOpt = opt === q.answer;
                  
                  let state = null;
                  if (isAnswered) {
                    if (isCorrectOpt) state = "correct";
                    else if (isSelected) state = "wrong";
                    else state = "dimmed";
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => pickAnswer(qIndex, opt)}
                      style={{
                        width: "100%",
                        padding: "14px 20px",
                        borderRadius: 12,
                        textAlign: "left",
                        fontSize: 16,
                        fontWeight: 700,
                        cursor: isAnswered ? "default" : "pointer",
                        transition: "all 0.2s ease",
                        background: state === "correct" ? "#27AE60" : state === "wrong" ? THEME.colors.primary : THEME.colors.white,
                        color: (state === "correct" || state === "wrong") ? THEME.colors.white : THEME.colors.secondary,
                        border: `2px solid ${state === "correct" ? "#27AE60" : state === "wrong" ? THEME.colors.primary : "#E8E0D5"}`,
                        opacity: state === "dimmed" ? 0.5 : 1,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                      onMouseEnter={e => {
                        if (!isAnswered) {
                          e.currentTarget.style.background = "#F9F5F0";
                          e.currentTarget.style.borderColor = THEME.colors.primary;
                        }
                      }}
                      onMouseLeave={e => {
                        if (!isAnswered) {
                          e.currentTarget.style.background = THEME.colors.white;
                          e.currentTarget.style.borderColor = "#E8E0D5";
                        }
                      }}
                    >
                      {opt}
                      {state === "correct" && <span style={{ fontSize: 20 }}>✓</span>}
                      {state === "wrong" && <span style={{ fontSize: 20 }}>✗</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <button onClick={prev} style={navBtnStyle(THEME.colors.white, THEME.colors.textLight)}>← Previous Passage</button>
          <button onClick={next} style={navBtnStyle(THEME.colors.primary, THEME.colors.white)}>Next Passage →</button>
        </div>
      </div>
    </div>
  );
}

function toggleBtnStyle(active) {
  return {
    padding: "8px 16px",
    borderRadius: 20,
    background: active ? `${THEME.colors.primary}11` : "transparent",
    border: `1.5px solid ${active ? THEME.colors.primary : "#E8E0D5"}`,
    color: active ? THEME.colors.primary : THEME.colors.textLight,
    fontWeight: 800,
    fontSize: 13,
    cursor: "pointer",
    transition: "all 0.2s ease"
  };
}

function navBtnStyle(bg, color) {
  return {
    padding: "14px 28px",
    borderRadius: 30,
    background: bg,
    border: `2px solid ${bg === THEME.colors.white ? "#E8E0D5" : bg}`,
    color: color,
    fontWeight: 800,
    fontSize: 15,
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: bg !== THEME.colors.white ? "0 4px 10px rgba(0,0,0,0.1)" : "none"
  };
}
