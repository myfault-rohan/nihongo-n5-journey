import React, { useState } from "react";
import KANJI_N5 from "../data/kanjiN5";
import { speak } from "../utils/speech";
import { theme as THEME } from "../styles/theme";

export default function KanjiChart({ onProgress }) {
  const [learned, setLearned] = useState(new Set());
  const [showExample, setShowExample] = useState({});

  const kanjiData = KANJI_N5.map((k, index) => {
    const match = k.example?.word?.match(/(.+?)\\s*\\((.+?)\\)/);
    return {
      id: index,
      kanji: k.char,
      onyomi: k.onyomi,
      kunyomi: k.kunyomi,
      meaning: k.meaning,
      example: {
        word: match ? match[1].trim() : k.example.word,
        reading: match ? match[2].trim() : "",
        meaning: k.example.meaning
      }
    };
  });

  const toggleLearned = (id, e) => {
    e.stopPropagation();
    setLearned((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      if (onProgress) onProgress(next.size);
      return next;
    });
  };

  const toggleExample = (id, e) => {
    e.stopPropagation();
    setShowExample((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="fade-up">
      <style>{`
        .kanji-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width: 768px) {
          .kanji-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px;
          }
        }
      `}</style>

      <div style={{ marginBottom: 28, textAlign: "center" }}>
        <div style={{ fontSize: 13, letterSpacing: 5, color: THEME.colors.primary, fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>
          Lesson 3
        </div>
        <h2 style={{ fontSize: 32, fontWeight: 900, color: THEME.colors.secondary, margin: "0 0 4px", fontFamily: THEME.fonts.main }}>
          漢 Kanji
        </h2>
        <p style={{ color: THEME.colors.textLight, margin: 0, fontSize: 14 }}>
          {learned.size} / {kanjiData.length} learned · JLPT N5
        </p>

        <div style={{ height: 8, background: THEME.colors.gray, borderRadius: 4, overflow: "hidden", marginTop: 20, maxWidth: 400, margin: '20px auto 0' }}>
          <div style={{
            height: "100%",
            width: `${(learned.size / kanjiData.length) * 100}%`,
            background: `linear-gradient(90deg, ${THEME.colors.gold}, ${THEME.colors.primary})`,
            borderRadius: 4,
            transition: "width 0.4s ease",
          }} />
        </div>
      </div>

      <div className="kanji-grid">
        {kanjiData.map((item) => {
          const isLearned = learned.has(item.id);
          const isExampleVisible = showExample[item.id];

          return (
            <div
              key={item.id}
              className="fade-up"
              style={{
                background: "#F9F5F0", // Off-white washi paper feel
                border: "1.5px solid #E8E0D5", // Subtle border
                borderRadius: 4, // More blocky, like a stamp pad or paper card
                padding: "24px 16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                position: "relative",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.03)";
              }}
            >
              {/* Learned Stamp (Top Right) */}
              <button
                onClick={(e) => toggleLearned(item.id, e)}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  border: isLearned ? `2px solid ${THEME.colors.primary}` : "1.5px dashed #ccc",
                  background: isLearned ? THEME.colors.white : "transparent",
                  color: isLearned ? THEME.colors.primary : "#ccc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: 16,
                  fontWeight: 900,
                  transition: "all 0.2s ease",
                  transform: isLearned ? "rotate(-10deg)" : "rotate(0)", // Slight tilt to look like a stamp
                }}
                title={isLearned ? "Unmark" : "Mark as learned"}
                onMouseEnter={e => e.currentTarget.style.transform = isLearned ? "rotate(-10deg) scale(1.1)" : "scale(1.1)"}
                onMouseLeave={e => e.currentTarget.style.transform = isLearned ? "rotate(-10deg) scale(1)" : "scale(1)"}
              >
                {isLearned ? "✓" : ""}
              </button>

              {/* Speak button (Top Left) */}
              <button
                onClick={(e) => { e.stopPropagation(); speak(item.kanji); }}
                style={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  border: "none",
                  background: "transparent",
                  color: THEME.colors.textLight,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: 14,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = THEME.colors.primary;
                  e.currentTarget.style.transform = "scale(1.2)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = THEME.colors.textLight;
                  e.currentTarget.style.transform = "scale(1)";
                }}
                title="Hear Kanji"
              >
                🔊
              </button>

              {/* Large Kanji */}
              <div style={{ 
                fontSize: 68, 
                fontWeight: 900, 
                color: THEME.colors.secondary, // ink black
                lineHeight: 1.2, 
                marginTop: 16,
                fontFamily: "'Shippori Mincho', 'Georgia', serif" 
              }}>
                {item.kanji}
              </div>

              {/* Meanings & Readings */}
              <div style={{ fontSize: 16, fontWeight: 800, color: THEME.colors.secondary, marginBottom: 12 }}>
                {item.meaning}
              </div>

              <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
                {/* On'yomi */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <span style={{ fontSize: 9, fontWeight: 800, color: THEME.colors.white, background: THEME.colors.primary, padding: "2px 6px", borderRadius: 4, letterSpacing: 1 }}>ON</span>
                  <span style={{ fontSize: 13, color: THEME.colors.primary, fontWeight: 800 }}>{item.onyomi || "-"}</span>
                </div>
                
                {/* Kun'yomi */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <span style={{ fontSize: 9, fontWeight: 800, color: THEME.colors.white, background: "#888", padding: "2px 6px", borderRadius: 4, letterSpacing: 1 }}>KUN</span>
                  <span style={{ fontSize: 13, color: "#555", fontWeight: 700 }}>{item.kunyomi || "-"}</span>
                </div>
              </div>

              {/* Example Toggler */}
              <div style={{ width: "100%", marginTop: "auto" }}>
                {!isExampleVisible ? (
                  <button
                    onClick={(e) => toggleExample(item.id, e)}
                    style={{
                      width: "100%",
                      padding: "8px",
                      background: "transparent",
                      border: "1.5px dashed #ccc",
                      borderRadius: 4,
                      color: THEME.colors.textLight,
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = THEME.colors.secondary}
                    onMouseLeave={e => e.currentTarget.style.borderColor = "#ccc"}
                  >
                    View Example
                  </button>
                ) : (
                  <div 
                    onClick={(e) => toggleExample(item.id, e)}
                    style={{
                      width: "100%",
                      padding: "12px 8px",
                      background: "#fff",
                      border: "1.5px solid #E8E0D5",
                      borderRadius: 4,
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                      animation: "fadeUp 0.2s ease forwards",
                    }}
                  >
                    <div style={{ fontSize: 18, fontWeight: 900, color: THEME.colors.secondary }}>{item.example.word}</div>
                    <div style={{ fontSize: 12, color: THEME.colors.primary, fontWeight: 800 }}>{item.example.reading}</div>
                    <div style={{ fontSize: 11, color: THEME.colors.textLight }}>{item.example.meaning}</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
