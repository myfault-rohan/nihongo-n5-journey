import React, { useState } from "react";
import { speak } from "../utils/speech";
import GRAMMAR_N5 from "../data/grammar_n5";
import { theme as THEME } from "../styles/theme";

// Group the grammar rules
const groupedGrammar = GRAMMAR_N5.reduce((acc, curr) => {
  const group = curr.group || "Other";
  if (!acc[group]) acc[group] = [];
  acc[group].push(curr);
  return acc;
}, {});

export default function Grammar({ onProgress }) {
  const [understood, setUnderstood] = useState(new Set());

  const toggle = (id) => {
    setUnderstood((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      if (onProgress) onProgress(next.size);
      return next;
    });
  };

  return (
    <div className="fade-up" style={{ paddingBottom: 60 }}>
      {/* Header */}
      <div style={{ marginBottom: 32, textAlign: "center" }}>
        <div style={{ fontSize: 13, letterSpacing: 5, color: THEME.colors.primary, fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>
          Lesson 5
        </div>
        <h2 style={{ fontSize: 32, fontWeight: 900, color: THEME.colors.secondary, margin: "0 0 16px", fontFamily: THEME.fonts.main }}>
          文法 Grammar
        </h2>
        <p style={{ color: THEME.colors.textLight, margin: 0, fontSize: 14 }}>
          {understood.size} / {GRAMMAR_N5.length} rules understood · JLPT N5
        </p>
        
        {/* Progress */}
        <div style={{ height: 10, background: "#E8E0D5", borderRadius: 5, overflow: "hidden", marginTop: 24, maxWidth: 400, margin: '24px auto 0' }}>
          <div style={{
            height: "100%",
            width: `${(understood.size / GRAMMAR_N5.length) * 100}%`,
            background: THEME.colors.primary,
            borderRadius: 5,
            transition: "width 0.4s ease",
          }} />
        </div>
      </div>

      {Object.entries(groupedGrammar).map(([groupName, rules], groupIndex) => (
        <div key={groupName} style={{ marginBottom: 48 }}>
          
          {/* Group Header */}
          <div className="fade-up" style={{
            marginBottom: 24,
            paddingLeft: 16,
            borderLeft: `6px solid ${THEME.colors.primary}`,
            display: "inline-block"
          }}>
            <h3 style={{ 
              fontSize: 24, 
              fontWeight: 900, 
              color: THEME.colors.secondary, // ink black
              margin: 0,
              letterSpacing: 1
            }}>
              {groupName}
            </h3>
          </div>

          {/* Grammar Cards Grid */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {rules.map((g, index) => {
              const done = understood.has(g.id);
              
              return (
                <div
                  key={g.id}
                  className="fade-up"
                  style={{
                    background: THEME.colors.white,
                    border: "1px solid #E8E0D5",
                    borderRadius: 12,
                    padding: "24px",
                    transition: "all 0.2s ease",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                    animationDelay: `${(index % 10) * 0.05}s` // staggered entry
                  }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.06)"}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.03)"}
                >
                  {/* Title row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                    <div>
                      <div style={{ 
                        fontSize: 20, 
                        fontWeight: 900, 
                        color: THEME.colors.secondary,
                        marginBottom: 4
                      }}>
                        {g.title}
                      </div>
                      <div style={{
                        display: "inline-block",
                        background: "#f5f5f5",
                        color: THEME.colors.textLight,
                        borderRadius: 4,
                        padding: "2px 8px",
                        fontSize: 11,
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: 1
                      }}>
                        Rule {g.id}
                      </div>
                    </div>

                    {/* Understood Button */}
                    <button
                      onClick={() => toggle(g.id)}
                      style={{
                        background: done ? THEME.colors.primary : "transparent",
                        border: `2px solid ${done ? THEME.colors.primary : "#ccc"}`,
                        borderRadius: 20,
                        padding: "8px 16px",
                        cursor: "pointer",
                        color: done ? THEME.colors.white : THEME.colors.textLight,
                        fontSize: 13,
                        fontWeight: 800,
                        flexShrink: 0,
                        marginLeft: 16,
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={e => {
                        if (!done) {
                          e.currentTarget.style.borderColor = THEME.colors.primary;
                          e.currentTarget.style.color = THEME.colors.primary;
                        }
                      }}
                      onMouseLeave={e => {
                        if (!done) {
                          e.currentTarget.style.borderColor = "#ccc";
                          e.currentTarget.style.color = THEME.colors.textLight;
                        }
                      }}
                    >
                      {done ? "✓ Understood" : "Mark understood"}
                    </button>
                  </div>

                  {/* Example box */}
                  <div style={{
                    background: "#F9F5F0",
                    borderLeft: `4px solid ${THEME.colors.primary}`,
                    padding: "20px",
                    marginBottom: 16,
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center"
                  }}>
                    <div>
                      <div style={{ 
                        fontSize: 24, 
                        fontWeight: 900, 
                        color: THEME.colors.secondary, 
                        marginBottom: 6,
                        fontFamily: "'Shippori Mincho', 'Georgia', serif" 
                      }}>
                        {g.example}
                      </div>
                      <div style={{ fontSize: 13, color: THEME.colors.textLight, marginBottom: 8, fontWeight: 700 }}>
                        {g.romaji}
                      </div>
                      <div style={{ fontSize: 16, fontWeight: 900, color: THEME.colors.primary }}>
                        {g.meaning}
                      </div>
                    </div>
                    
                    {/* Speak Button */}
                    <button
                      onClick={() => speak(g.example)}
                      style={{
                        background: THEME.colors.white,
                        border: "1.5px solid #E8E0D5",
                        borderRadius: 50,
                        width: 48,
                        height: 48,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        fontSize: 20,
                        flexShrink: 0,
                        marginLeft: 16,
                        transition: "all 0.2s ease",
                        color: THEME.colors.primary,
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = "scale(1.1)";
                        e.currentTarget.style.borderColor = THEME.colors.primary;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.borderColor = "#E8E0D5";
                      }}
                      title="Hear pronunciation"
                    >
                      🔊
                    </button>
                  </div>

                  {/* Note */}
                  <div style={{ 
                    fontSize: 14, 
                    color: THEME.colors.textLight, 
                    lineHeight: 1.6, 
                    fontWeight: 500,
                    fontStyle: "italic" 
                  }}>
                    💡 {g.note}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Simple SVG Divider between groups (except after the last group) */}
          {groupIndex < Object.keys(groupedGrammar).length - 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 48 }}>
              <svg width="60" height="10" viewBox="0 0 60 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 5 L55 5" stroke="#E8E0D5" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 8" />
              </svg>
            </div>
          )}

        </div>
      ))}
    </div>
  );
}
