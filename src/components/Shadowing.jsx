import React, { useState } from "react";
import { speak } from "../utils/speech";
import GRAMMAR_N5 from "../data/grammar_n5";
import { theme as THEME } from "../styles/theme";

export default function Shadowing() {
  const [idx, setIdx] = useState(0);
  const [speed, setSpeed] = useState(0.7);
  const [showRomaji, setShowRomaji] = useState(true);
  const [showMeaning, setShowMeaning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState("echo"); // echo | simultaneous

  const sentence = GRAMMAR_N5[idx];

  const playSentence = (rate) => {
    setIsPlaying(true);
    speak(sentence.example, rate || speed);
    setTimeout(() => setIsPlaying(false), 2500);
  };

  const nextSentence = () => setIdx((i) => (i + 1) % GRAMMAR_N5.length);
  const prevSentence = () => setIdx((i) => (i - 1 + GRAMMAR_N5.length) % GRAMMAR_N5.length);

  const btnBase = {
    padding: "12px 22px",
    borderRadius: 10,
    border: "none",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  return (
    <div className="fade-up" style={{ paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <h2 style={{
          fontSize: 28, fontWeight: 900, color: THEME.colors.secondary,
          margin: 0, letterSpacing: 1,
        }}>
          🗣️ Shadowing Practice
        </h2>
        <p style={{ color: THEME.colors.textLight, marginTop: 8, fontSize: 14 }}>
          Listen, then speak along — train your pronunciation and rhythm
        </p>
      </div>

      {/* Mode Toggle */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 20 }}>
        {[
          { id: "echo", label: "🔁 Echo (Repeat After)" },
          { id: "simultaneous", label: "🎙️ Simultaneous (Speak Along)" },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            style={{
              ...btnBase,
              padding: "8px 16px", fontSize: 13,
              background: mode === m.id ? THEME.colors.primary : "transparent",
              color: mode === m.id ? "#fff" : THEME.colors.textLight,
              border: `1.5px solid ${mode === m.id ? THEME.colors.primary : "#E8E0D5"}`,
            }}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Progress */}
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <span style={{
          fontSize: 12, color: THEME.colors.textLight,
          background: THEME.colors.gray, padding: "4px 12px", borderRadius: 20,
        }}>
          Sentence {idx + 1} of {GRAMMAR_N5.length}
        </span>
      </div>

      {/* Grammar point title */}
      <div style={{
        textAlign: "center", marginBottom: 12,
        fontSize: 13, color: THEME.colors.primary, fontWeight: 700,
        textTransform: "uppercase", letterSpacing: 1.5,
      }}>
        {sentence.title}
      </div>

      {/* Main sentence card */}
      <div style={{
        background: THEME.colors.white,
        borderRadius: 16,
        padding: "40px 28px",
        boxShadow: THEME.shadows.card,
        border: `1px solid ${THEME.colors.border || "#E8E0D5"}`,
        textAlign: "center",
        marginBottom: 20,
        position: "relative",
      }}>
        {/* Japanese sentence */}
        <div style={{
          fontSize: "clamp(1.5rem, 5vw, 2.2rem)",
          fontFamily: THEME.fonts.japanese,
          fontWeight: 700,
          color: THEME.colors.secondary,
          lineHeight: 1.6,
          marginBottom: 16,
        }}>
          {sentence.example}
        </div>

        {/* Waveform animation */}
        {isPlaying && (
          <div style={{
            display: "flex", gap: 3, justifyContent: "center",
            height: 36, alignItems: "center", margin: "12px 0",
          }}>
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} style={{
                width: 3,
                background: THEME.colors.primary,
                borderRadius: 2,
                animation: `waveBar 0.5s ease-in-out ${i * 0.04}s infinite alternate`,
              }} />
            ))}
          </div>
        )}

        {/* Romaji */}
        {showRomaji && (
          <div style={{
            fontSize: 15, color: THEME.colors.textLight, fontStyle: "italic",
            marginTop: 8,
          }}>
            {sentence.romaji}
          </div>
        )}

        {/* English meaning */}
        {showMeaning && (
          <div style={{
            fontSize: 16, color: THEME.colors.primary, fontWeight: 600,
            marginTop: 8,
          }}>
            {sentence.meaning}
          </div>
        )}
      </div>

      {/* Playback Controls */}
      <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 16, flexWrap: "wrap" }}>
        <button
          onClick={() => playSentence(speed)}
          style={{ ...btnBase, background: THEME.colors.primary, color: "#fff", fontSize: 16 }}
        >
          ▶ Play
        </button>
        <button
          onClick={() => playSentence(0.5)}
          style={{ ...btnBase, background: THEME.colors.gold, color: "#fff" }}
        >
          🐢 Slow (0.5x)
        </button>
        <button
          onClick={() => {
            setIsPlaying(true);
            setTimeout(() => {
              speak(sentence.example, speed);
              setTimeout(() => setIsPlaying(false), 2500);
            }, mode === "echo" ? 3000 : 0);
          }}
          style={{ ...btnBase, background: "#27AE60", color: "#fff" }}
        >
          🎙️ Your Turn
        </button>
      </div>

      {/* Speed slider */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: 12, marginBottom: 20,
      }}>
        <span style={{ fontSize: 12, color: THEME.colors.textLight }}>Speed:</span>
        <input
          type="range" min="0.4" max="1.2" step="0.1"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          style={{ width: 120, accentColor: THEME.colors.primary }}
        />
        <span style={{ fontSize: 13, fontWeight: 700, color: THEME.colors.secondary }}>
          {speed}x
        </span>
      </div>

      {/* Toggle controls */}
      <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 24, flexWrap: "wrap" }}>
        <button
          onClick={() => setShowRomaji(!showRomaji)}
          style={{
            ...btnBase, padding: "8px 16px", fontSize: 13,
            background: showRomaji ? THEME.colors.secondary : "transparent",
            color: showRomaji ? "#fff" : THEME.colors.textLight,
            border: `1.5px solid ${showRomaji ? THEME.colors.secondary : "#E8E0D5"}`,
          }}
        >
          {showRomaji ? "Hide" : "Show"} Romaji
        </button>
        <button
          onClick={() => setShowMeaning(!showMeaning)}
          style={{
            ...btnBase, padding: "8px 16px", fontSize: 13,
            background: showMeaning ? THEME.colors.secondary : "transparent",
            color: showMeaning ? "#fff" : THEME.colors.textLight,
            border: `1.5px solid ${showMeaning ? THEME.colors.secondary : "#E8E0D5"}`,
          }}
        >
          {showMeaning ? "Hide" : "Show"} English
        </button>
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 28 }}>
        <button onClick={prevSentence} style={{ ...btnBase, background: THEME.colors.gray, color: THEME.colors.secondary }}>
          ← Previous
        </button>
        <button onClick={nextSentence} style={{ ...btnBase, background: THEME.colors.primary, color: "#fff" }}>
          Next →
        </button>
      </div>

      {/* Instructions */}
      <div style={{
        padding: 20, borderRadius: 12,
        background: THEME.colors.gray,
        border: `1px solid ${THEME.colors.border || "#E8E0D5"}`,
        maxWidth: 500, margin: "0 auto",
        fontSize: 13, color: THEME.colors.textLight, lineHeight: 1.7,
      }}>
        <strong style={{ color: THEME.colors.secondary }}>🎯 How to shadow effectively:</strong>
        <ol style={{ margin: "8px 0 0 0", paddingLeft: 18 }}>
          <li>Press ▶ to hear the sentence at normal speed</li>
          <li>Press 🎙️ — listen and <strong>repeat out loud</strong> matching the rhythm</li>
          <li>Use 🐢 Slow if it feels too fast</li>
          <li>Hide romaji once comfortable — rely only on your ears</li>
          <li>Focus on <strong>pitch, rhythm, and flow</strong>, not perfection</li>
        </ol>
        <div style={{ marginTop: 12, padding: "8px 12px", background: THEME.colors.white, borderRadius: 8 }}>
          <strong style={{ color: THEME.colors.gold }}>💡 Pro tip:</strong>{" "}
          In <em>simultaneous</em> mode, speak at the exact same time as the audio.
          In <em>echo</em> mode, a 3-second pause gives you time to prepare.
        </div>
      </div>
    </div>
  );
}
