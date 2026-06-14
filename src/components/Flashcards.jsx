import React, { useState, useEffect } from "react";
import { speak } from "../utils/speech";
import VOCAB_N5 from "../data/vocab_n5";
import GRAMMAR_N5 from "../data/grammar_n5";
import { theme as THEME } from "../styles/theme";
import { playFlip } from "../utils/sounds";
import { gradeItem, getDueItems } from "../utils/srs";

const CATS = ["All", ...Array.from(new Set(VOCAB_N5.map((v) => v.cat)))];

// Map vocab to grammar sentence containing it
const SENTENCE_MAP = {};
GRAMMAR_N5.forEach(g => {
  VOCAB_N5.forEach(v => {
    if (g.example.includes(v.jp)) {
      SENTENCE_MAP[v.jp] = g;
    }
  });
});

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function Flashcards({ onProgress }) {
  const [filter, setFilter] = useState("All");
  const [cards, setCards] = useState(() => shuffle(VOCAB_N5));
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [learned, setLearned] = useState(new Set());
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [contextMode, setContextMode] = useState(false);
  const [dueCount, setDueCount] = useState(0);

  const filtered = filter === "All" ? cards : cards.filter((c) => c.cat === filter);
  const card = filtered[idx % Math.max(filtered.length, 1)];
  const contextSentence = card ? SENTENCE_MAP[card.jp] : null;

  useEffect(() => {
    const due = getDueItems(VOCAB_N5.map(v => `vocab:${v.jp}`));
    setDueCount(due.length);
  }, [idx]);

  const flip = () => {
    playFlip();
    setFlipped(true);
    if (autoSpeak && card) {
      if (contextMode && contextSentence) speak(contextSentence.example);
      else speak(card.jp);
    }
  };

  const next = () => {
    setFlipped(false);
    setTimeout(() => setIdx((i) => (i + 1) % filtered.length), 100);
  };

  const grade = (level) => {
    if (card) gradeItem(`vocab:${card.jp}`, level);
    setFlipped(false);
    setTimeout(() => {
      setIdx((i) => (i + 1) % filtered.length);
    }, 100);
  };

  const prev = () => {
    setFlipped(false);
    setTimeout(() => setIdx((i) => (i - 1 + filtered.length) % filtered.length), 100);
  };

  const reshuffle = () => {
    setCards(shuffle(VOCAB_N5));
    setIdx(0);
    setFlipped(false);
  };

  const markLearned = () => {
    if (!card) return;
    setLearned((prev) => {
      const next = new Set(prev);
      next.has(card.jp) ? next.delete(card.jp) : next.add(card.jp);
      if (onProgress) onProgress(next.size);
      return next;
    });
  };

  if (!card) return null;
  const isLearned = learned.has(card.jp);

  return (
    <div className="fade-up" style={{ paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ marginBottom: 32, textAlign: "center" }}>
        <div style={{ fontSize: 13, letterSpacing: 5, color: THEME.colors.primary, fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>
          Lesson 4
        </div>
        <h2 style={{ fontSize: 32, fontWeight: 900, color: THEME.colors.secondary, margin: "0 0 16px", fontFamily: THEME.fonts.main }}>
          語 Vocabulary
        </h2>
        <p style={{ color: THEME.colors.textLight, margin: 0, fontSize: 14 }}>
          {dueCount} cards due today
        </p>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
        {/* Category filter */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => { setFilter(c); setIdx(0); setFlipped(false); }}
              style={{
                padding: "8px 18px",
                borderRadius: 24,
                border: `1.5px solid ${filter === c ? THEME.colors.primary : "#E8E0D5"}`,
                background: filter === c ? THEME.colors.primary : THEME.colors.white,
                color: filter === c ? THEME.colors.white : THEME.colors.textLight,
                fontWeight: 800,
                fontSize: 13,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Auto-speak & Context toggles */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            onClick={() => setContextMode((v) => !v)}
            style={{
              padding: "8px 20px",
              borderRadius: 24,
              border: `1.5px solid ${contextMode ? THEME.colors.primary : "#E8E0D5"}`,
              background: contextMode ? THEME.colors.primary : THEME.colors.white,
              color: contextMode ? THEME.colors.white : THEME.colors.textLight,
              fontSize: 13, fontWeight: 800, cursor: "pointer", transition: "all 0.2s ease",
            }}
          >
            {contextMode ? "📝 Context ON" : "📝 Context OFF"}
          </button>

          <button
            onClick={() => setAutoSpeak((v) => !v)}
            style={{
              padding: "8px 20px",
              borderRadius: 24,
              border: `1.5px solid ${autoSpeak ? THEME.colors.primary : "#E8E0D5"}`,
              background: autoSpeak ? THEME.colors.primary : THEME.colors.white,
              color: autoSpeak ? THEME.colors.white : THEME.colors.textLight,
              fontSize: 13, fontWeight: 800, cursor: "pointer", transition: "all 0.2s ease",
            }}
          >
            {autoSpeak ? "🔊 Auto-speak ON" : "🔇 Auto-speak OFF"}
          </button>
        </div>
      </div>

      {/* Progress */}
      <div style={{ marginBottom: 24, fontSize: 14, color: THEME.colors.textLight, textAlign: "center", fontWeight: 800 }}>
        Card {idx + 1} of {filtered.length}
        {filter !== "All" && <span style={{ color: THEME.colors.primary, marginLeft: 8 }}>· {filter}</span>}
      </div>

      {/* Flashcard Area */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
        
        {/* The Card */}
        <div
          key={card.jp} // Force re-mount animation on new card
          className="fade-up"
          onClick={!flipped ? flip : undefined}
          style={{
            width: "100%",
            maxWidth: 540,
            minHeight: 280,
            background: THEME.colors.white,
            border: "2px solid #E8E0D5",
            borderTop: flipped ? `8px solid ${THEME.colors.primary}` : "2px solid #E8E0D5",
            borderRadius: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: flipped ? "default" : "pointer",
            padding: "40px 24px",
            boxSizing: "border-box",
            textAlign: "center",
            boxShadow: flipped ? THEME.shadows.floating : THEME.shadows.card,
            transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            position: "relative",
            transform: flipped ? "translateY(-4px)" : "translateY(0)",
          }}
        >
          {/* Category tag */}
          <div style={{
            position: "absolute",
            top: 16,
            left: 16,
            background: "#f5f5f5",
            color: THEME.colors.textLight,
            borderRadius: 6,
            padding: "4px 10px",
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 1,
            textTransform: "uppercase"
          }}>
            {card.cat}
          </div>

          {/* Learned badge (Red Stamp Style) */}
          {isLearned && (
            <div style={{
              position: "absolute",
              top: 16,
              right: 16,
              width: 48,
              height: 48,
              borderRadius: "50%",
              border: `3px solid ${THEME.colors.primary}`,
              color: THEME.colors.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              fontWeight: 900,
              transform: "rotate(-15deg)",
              boxShadow: "0 2px 5px rgba(192, 57, 43, 0.2)"
            }} title="Learned">
              ✓
            </div>
          )}

          {/* Japanese word or context sentence */}
          {contextMode && contextSentence ? (
            <div style={{ 
              fontSize: "clamp(1.5rem, 4vw, 2rem)", 
              fontWeight: 900, 
              lineHeight: 1.4, 
              marginBottom: 16, 
              color: THEME.colors.secondary,
              fontFamily: THEME.fonts.japanese 
            }}>
              {contextSentence.example.split(card.jp).map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && <span style={{ color: THEME.colors.primary }}>{card.jp}</span>}
                </React.Fragment>
              ))}
            </div>
          ) : (
            <div style={{ 
              fontSize: 68, 
              fontWeight: 900, 
              lineHeight: 1.1, 
              marginBottom: 16, 
              color: THEME.colors.secondary,
              fontFamily: THEME.fonts.japanese 
            }}>
              {card.jp}
            </div>
          )}

          {flipped ? (
            <div className="fade-up" style={{ animationDuration: '0.4s' }}>
              {contextMode && contextSentence && (
                <div style={{ fontSize: 16, fontWeight: 700, color: THEME.colors.secondary, marginBottom: 12, fontStyle: "italic" }}>
                  {contextSentence.meaning}
                </div>
              )}
              <div style={{ fontSize: 20, color: THEME.colors.textLight, marginBottom: 8, fontWeight: 700 }}>
                {card.rom}
              </div>
              <div style={{ fontSize: 36, fontWeight: 900, color: THEME.colors.gold }}>
                {card.en}
              </div>
              
              {/* SRS Self-Grading Buttons */}
              <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 32, flexWrap: "wrap" }}>
                <button onClick={(e) => { e.stopPropagation(); grade("again"); }} style={btnStyle("#E74C3C", "#E74C3C", "#fff")}>
                  😫 Again
                </button>
                <button onClick={(e) => { e.stopPropagation(); grade("hard"); }} style={btnStyle("#E67E22", "#E67E22", "#fff")}>
                  🤔 Hard
                </button>
                <button onClick={(e) => { e.stopPropagation(); grade("good"); }} style={btnStyle("#27AE60", "#27AE60", "#fff")}>
                  😊 Good
                </button>
                <button onClick={(e) => { e.stopPropagation(); grade("easy"); }} style={btnStyle("#2ECC71", "#2ECC71", "#fff")}>
                  🌟 Easy
                </button>
              </div>

              <div style={{ marginTop: 20 }}>
                <button
                  onClick={(e) => { e.stopPropagation(); speak(contextMode && contextSentence ? contextSentence.example : card.jp); }}
                  style={{
                    background: "transparent", border: "none", cursor: "pointer", fontSize: 20, color: THEME.colors.primary, transition: "transform 0.2s ease",
                  }}
                  title="Hear again"
                >
                  🔊 Hear Again
                </button>
              </div>
            </div>
          ) : (
            <div style={{ 
              fontSize: 16, 
              color: THEME.colors.primary, 
              marginTop: 16, 
              fontWeight: 800,
              opacity: 0.8
            }}>
              Tap to reveal meaning
            </div>
          )}
        </div>

        {/* Action buttons (only show if not flipped, since flipped shows SRS buttons) */}
        {!flipped && (
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
            <button onClick={prev} style={btnStyle("transparent", "#E8E0D5", THEME.colors.textLight)}>← Prev</button>
            <button onClick={reshuffle} style={btnStyle(THEME.colors.gold, THEME.colors.gold, THEME.colors.white)}>🔀 Shuffle</button>
            <button onClick={next} style={btnStyle(THEME.colors.primary, THEME.colors.primary, THEME.colors.white)}>Next →</button>
          </div>
        )}
      </div>
    </div>
  );
}

function btnStyle(bg, border, color) {
  return {
    padding: "14px 28px",
    borderRadius: 30,
    border: `2px solid ${border}`,
    background: bg,
    color,
    fontWeight: 800,
    fontSize: 15,
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: bg !== "transparent" ? "0 4px 10px rgba(0,0,0,0.1)" : "none"
  };
}
