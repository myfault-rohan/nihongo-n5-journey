import React, { useState, useRef, useEffect, useCallback } from "react";
import { theme as THEME } from "../styles/theme";

const HIRAGANA = [
  "あ","い","う","え","お",
  "か","き","く","け","こ",
  "さ","し","す","せ","そ",
  "た","ち","つ","て","と",
  "な","に","ぬ","ね","の",
  "は","ひ","ふ","へ","ほ",
  "ま","み","む","め","も",
  "や","ゆ","よ",
  "ら","り","る","れ","ろ",
  "わ","を","ん"
];

const KATAKANA = [
  "ア","イ","ウ","エ","オ",
  "カ","キ","ク","ケ","コ",
  "サ","シ","ス","セ","ソ",
  "タ","チ","ツ","テ","ト",
  "ナ","ニ","ヌ","ネ","ノ",
  "ハ","ヒ","フ","ヘ","ホ",
  "マ","ミ","ム","メ","モ",
  "ヤ","ユ","ヨ",
  "ラ","リ","ル","レ","ロ",
  "ワ","ヲ","ン"
];

const ROMAJI = [
  "a","i","u","e","o",
  "ka","ki","ku","ke","ko",
  "sa","shi","su","se","so",
  "ta","chi","tsu","te","to",
  "na","ni","nu","ne","no",
  "ha","hi","fu","he","ho",
  "ma","mi","mu","me","mo",
  "ya","yu","yo",
  "ra","ri","ru","re","ro",
  "wa","wo","n"
];

export default function WritingPractice() {
  const [mode, setMode] = useState("hiragana");
  const [idx, setIdx] = useState(0);
  const [showGuide, setShowGuide] = useState(true);
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const lastPoint = useRef(null);

  const chars = mode === "hiragana" ? HIRAGANA : KATAKANA;
  const currentChar = chars[idx];
  const currentRomaji = ROMAJI[idx];

  const getCanvasPoint = useCallback((e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  }, []);

  const startDraw = useCallback((e) => {
    e.preventDefault();
    isDrawing.current = true;
    lastPoint.current = getCanvasPoint(e);
  }, [getCanvasPoint]);

  const draw = useCallback((e) => {
    e.preventDefault();
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const point = getCanvasPoint(e);
    const prev = lastPoint.current;

    if (prev) {
      const dx = point.x - prev.x;
      const dy = point.y - prev.y;
      const velocity = Math.sqrt(dx * dx + dy * dy);
      const lineWidth = Math.max(2, 10 - velocity * 0.12);

      ctx.beginPath();
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(point.x, point.y);
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
    }
    lastPoint.current = point;
  }, [getCanvasPoint]);

  const endDraw = useCallback(() => {
    isDrawing.current = false;
    lastPoint.current = null;
  }, []);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  const nextChar = () => {
    clearCanvas();
    setIdx((i) => (i + 1) % chars.length);
  };

  const prevChar = () => {
    clearCanvas();
    setIdx((i) => (i - 1 + chars.length) % chars.length);
  };

  useEffect(() => {
    clearCanvas();
  }, [mode, clearCanvas]);

  // Setup canvas on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 320;
      canvas.height = 320;
    }
  }, []);

  const btnBase = {
    padding: "10px 20px",
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
          ✍️ Writing Practice
        </h2>
        <p style={{ color: THEME.colors.textLight, marginTop: 8, fontSize: 14 }}>
          Trace the character with your mouse or finger — build muscle memory
        </p>
      </div>

      {/* Mode Toggle */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 24 }}>
        {["hiragana", "katakana"].map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setIdx(0); }}
            style={{
              ...btnBase,
              background: mode === m ? THEME.colors.primary : "transparent",
              color: mode === m ? "#fff" : THEME.colors.textLight,
              border: `1.5px solid ${mode === m ? THEME.colors.primary : "#E8E0D5"}`,
            }}
          >
            {m === "hiragana" ? "ひらがな Hiragana" : "カタカナ Katakana"}
          </button>
        ))}
      </div>

      {/* Canvas Area */}
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
      }}>
        <div style={{
          position: "relative",
          width: 320, height: 320,
          background: THEME.colors.white,
          borderRadius: 16,
          boxShadow: THEME.shadows.card,
          border: `1px solid ${THEME.colors.border || "#E8E0D5"}`,
          overflow: "hidden",
        }}>
          {/* Ghost character guide */}
          {showGuide && (
            <div style={{
              position: "absolute",
              top: 0, left: 0, width: "100%", height: "100%",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 200,
              fontFamily: THEME.fonts.japanese,
              color: "rgba(0,0,0,0.06)",
              pointerEvents: "none",
              zIndex: 1,
              userSelect: "none",
            }}>
              {currentChar}
            </div>
          )}

          {/* Cross-hair guide lines */}
          <div style={{
            position: "absolute", top: "50%", left: 0, width: "100%", height: 1,
            background: "rgba(0,0,0,0.04)", pointerEvents: "none", zIndex: 1,
          }} />
          <div style={{
            position: "absolute", top: 0, left: "50%", width: 1, height: "100%",
            background: "rgba(0,0,0,0.04)", pointerEvents: "none", zIndex: 1,
          }} />

          {/* Canvas */}
          <canvas
            ref={canvasRef}
            style={{
              position: "relative", zIndex: 2,
              width: 320, height: 320,
              cursor: "crosshair",
              touchAction: "none",
            }}
            onPointerDown={startDraw}
            onPointerMove={draw}
            onPointerUp={endDraw}
            onPointerLeave={endDraw}
          />
        </div>

        {/* Character info */}
        <div style={{ textAlign: "center" }}>
          <div style={{
            fontSize: 48, fontFamily: THEME.fonts.japanese, fontWeight: 900,
            color: THEME.colors.secondary,
          }}>
            {currentChar}
          </div>
          <div style={{
            fontSize: 18, color: THEME.colors.textLight, fontStyle: "italic",
          }}>
            {currentRomaji}
          </div>
          <div style={{
            fontSize: 13, color: THEME.colors.textLight, marginTop: 4,
          }}>
            Character {idx + 1} of {chars.length}
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={prevChar}
            style={{ ...btnBase, background: THEME.colors.gray, color: THEME.colors.secondary }}
          >
            ← Prev
          </button>
          <button
            onClick={clearCanvas}
            style={{ ...btnBase, background: "#E8E0D5", color: THEME.colors.secondary }}
          >
            🗑️ Clear
          </button>
          <button
            onClick={() => setShowGuide(!showGuide)}
            style={{
              ...btnBase,
              background: showGuide ? THEME.colors.gold : "transparent",
              color: showGuide ? "#fff" : THEME.colors.textLight,
              border: `1.5px solid ${showGuide ? THEME.colors.gold : "#E8E0D5"}`,
            }}
          >
            {showGuide ? "👁️ Guide On" : "👁️ Guide Off"}
          </button>
          <button
            onClick={nextChar}
            style={{ ...btnBase, background: THEME.colors.primary, color: "#fff" }}
          >
            Next →
          </button>
        </div>

        {/* Tips */}
        <div style={{
          marginTop: 20, padding: 20, borderRadius: 12,
          background: THEME.colors.gray,
          border: `1px solid ${THEME.colors.border || "#E8E0D5"}`,
          maxWidth: 400, fontSize: 13, color: THEME.colors.textLight, lineHeight: 1.7,
        }}>
          <strong style={{ color: THEME.colors.secondary }}>💡 How to practice:</strong>
          <ol style={{ margin: "8px 0 0 0", paddingLeft: 18 }}>
            <li>Study the ghost character shape</li>
            <li>Trace over it with your mouse or finger</li>
            <li>Clear and try without the guide</li>
            <li>Move on when you can write it from memory</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
