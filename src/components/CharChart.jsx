import React, { useState, useEffect } from "react";
import { speak } from "../utils/speech";
import HIRAGANA from "../data/hiragana";
import KATAKANA from "../data/katakana";
import { theme as THEME } from "../styles/theme";

export default function CharChart({ type = "hiragana", onProgress }) {
  const [activeTab, setActiveTab] = useState(type);
  const data = activeTab === "hiragana" ? HIRAGANA : KATAKANA;
  
  // Store state for both to persist across tab switches
  const [learnedH, setLearnedH] = useState(new Set());
  const [revealedH, setRevealedH] = useState(new Set());
  const [learnedK, setLearnedK] = useState(new Set());
  const [revealedK, setRevealedK] = useState(new Set());
  
  const [playing, setPlaying] = useState(null);

  // Sync tab if parent changes it
  useEffect(() => {
    setActiveTab(type);
  }, [type]);

  const learned = activeTab === "hiragana" ? learnedH : learnedK;
  const setLearned = activeTab === "hiragana" ? setLearnedH : setLearnedK;
  const revealed = activeTab === "hiragana" ? revealedH : revealedK;
  const setRevealed = activeTab === "hiragana" ? setRevealedH : setRevealedK;

  const toggleReveal = (i) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const toggleLearned = (i, e) => {
    e.stopPropagation();
    setLearned((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  useEffect(() => {
    if (onProgress) onProgress(learned.size);
  }, [learned.size]);

  const playSound = (char, i, e) => {
    e.stopPropagation();
    setPlaying(i);
    speak(char);
    setTimeout(() => setPlaying(null), 800);
  };

  return (
    <div className="fade-up" style={{ paddingBottom: 40 }}>
      {/* Header with Tab Switcher */}
      <div style={{ marginBottom: 28, textAlign: "center" }}>
        <h2 style={{ fontSize: 32, fontWeight: 900, color: THEME.colors.secondary, margin: "0 0 16px", fontFamily: THEME.fonts.main }}>
          文字 Characters
        </h2>
        
        {/* Tab Switcher */}
        <div style={{ 
          display: "inline-flex", 
          background: THEME.colors.white, 
          padding: 6, 
          borderRadius: 30, 
          border: "1px solid #E8E0D5",
          boxShadow: THEME.shadows.header
        }}>
          <button
            onClick={() => setActiveTab("hiragana")}
            style={{
              padding: "10px 24px",
              background: activeTab === "hiragana" ? THEME.colors.primary : "transparent",
              color: activeTab === "hiragana" ? THEME.colors.white : THEME.colors.textLight,
              border: "none",
              borderRadius: 24,
              fontSize: 16,
              fontWeight: 800,
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={e => { if (activeTab !== "hiragana") e.currentTarget.style.color = THEME.colors.primary; }}
            onMouseLeave={e => { if (activeTab !== "hiragana") e.currentTarget.style.color = THEME.colors.textLight; }}
          >
            ひらがな Hiragana
          </button>
          <button
            onClick={() => setActiveTab("katakana")}
            style={{
              padding: "10px 24px",
              background: activeTab === "katakana" ? THEME.colors.primary : "transparent",
              color: activeTab === "katakana" ? THEME.colors.white : THEME.colors.textLight,
              border: "none",
              borderRadius: 24,
              fontSize: 16,
              fontWeight: 800,
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={e => { if (activeTab !== "katakana") e.currentTarget.style.color = THEME.colors.primary; }}
            onMouseLeave={e => { if (activeTab !== "katakana") e.currentTarget.style.color = THEME.colors.textLight; }}
          >
            カタカナ Katakana
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{
        display: "flex",
        gap: 16,
        marginBottom: 32,
        padding: "16px 24px",
        background: THEME.colors.white,
        borderRadius: 16,
        border: "1px solid #E8E0D5",
        boxShadow: THEME.shadows.card,
        alignItems: "center"
      }}>
        <div style={{ fontWeight: 900, fontSize: 24, color: THEME.colors.secondary }}>
          {learned.size}
          <span style={{ color: THEME.colors.textLight, fontSize: 14, marginLeft: 6, fontWeight: 600 }}>/ {data.length} learned</span>
        </div>
        <div style={{ flex: 1, height: 10, background: "#E8E0D5", borderRadius: 5, overflow: "hidden" }}>
          <div style={{
            height: "100%",
            width: `${(learned.size / data.length) * 100}%`,
            background: THEME.colors.primary,
            borderRadius: 5,
            transition: "width 0.4s ease",
          }} />
        </div>
      </div>

      {/* Grid */}
      <div className="fade-up" key={activeTab} style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
        gap: 16,
      }}>
        {data.map((c, i) => {
          const isRevealed = revealed.has(i);
          const isLearned = learned.has(i);
          const isPlaying = playing === i;

          return (
            <div
              key={i}
              onClick={() => toggleReveal(i)}
              style={{
                background: "#FFFFFF",
                border: "2px solid",
                borderColor: isLearned ? THEME.colors.primary : "#E8E0D5",
                borderLeft: isRevealed && !isLearned ? `6px solid ${THEME.colors.primary}` : (isLearned ? `6px solid ${THEME.colors.primary}` : "2px solid #E8E0D5"),
                borderRadius: 16,
                padding: isRevealed || isLearned ? "14px 8px 10px 4px" : "14px 8px 10px",
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
                position: "relative",
                boxShadow: isRevealed || isLearned ? THEME.shadows.card : "none",
                transform: isRevealed && !isLearned ? "translateY(-2px)" : "translateY(0)"
              }}
              onMouseEnter={e => { if (!isLearned) e.currentTarget.style.borderColor = `${THEME.colors.primary}44`; }}
              onMouseLeave={e => { if (!isLearned) e.currentTarget.style.borderColor = "#E8E0D5"; }}
            >
              {/* Learned badge */}
              {isLearned && (
                <div style={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  width: 24,
                  height: 24,
                  background: THEME.colors.white,
                  border: `2px solid ${THEME.colors.gold}`,
                  borderRadius: "50%",
                  fontSize: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: THEME.colors.gold,
                  fontWeight: 900,
                  boxShadow: "0 2px 5px rgba(212,160,23,0.2)",
                  zIndex: 2
                }}>✓</div>
              )}

              {/* Character */}
              <div style={{
                fontSize: 38,
                lineHeight: 1.1,
                marginBottom: 8,
                color: THEME.colors.secondary,
                fontWeight: 800,
              }}>
                {c.char}
              </div>

              {/* Romaji */}
              <div style={{
                fontSize: 14,
                color: isRevealed ? THEME.colors.secondary : "transparent",
                fontWeight: 800,
                letterSpacing: 1,
                marginBottom: 10,
                transition: "color 0.2s",
                minHeight: 18,
              }}>
                {c.rom}
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                {/* Sound button */}
                <button
                  onClick={(e) => playSound(c.char, i, e)}
                  title="Hear pronunciation"
                  style={{
                    background: isPlaying ? THEME.colors.primary : "#f5f5f5",
                    color: isPlaying ? THEME.colors.white : THEME.colors.textLight,
                    border: "none",
                    borderRadius: 8,
                    padding: "6px 10px",
                    cursor: "pointer",
                    fontSize: 14,
                    transition: "all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    transform: isPlaying ? "scale(1.2)" : "scale(1)",
                  }}
                  onMouseEnter={e => { if (!isPlaying) e.currentTarget.style.transform = "scale(1.1)"; }}
                  onMouseLeave={e => { if (!isPlaying) e.currentTarget.style.transform = "scale(1)"; }}
                >
                  🔊
                </button>

                {/* Learned button */}
                <button
                  onClick={(e) => toggleLearned(i, e)}
                  title={isLearned ? "Mark as not learned" : "Mark as learned"}
                  style={{
                    background: isLearned ? THEME.colors.gold : "#f5f5f5",
                    border: "none",
                    borderRadius: 8,
                    padding: "6px 10px",
                    cursor: "pointer",
                    fontSize: 12,
                    color: isLearned ? THEME.colors.white : THEME.colors.textLight,
                    fontWeight: 900,
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                >
                  ✓
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
