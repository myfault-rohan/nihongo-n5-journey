import React, { useState, useEffect } from "react";
import { theme as THEME } from "../styles/theme";
import { playCorrect, playWrong } from "../utils/sounds";

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

const SENTENCES = [
  { english: "I am a student.", words: ["わたし", "は", "がくせい", "です"], hint: "Topic は Noun です" },
  { english: "There is a dog.", words: ["いぬ", "が", "います"], hint: "Subject が Verb (existence)" },
  { english: "I eat an apple.", words: ["りんご", "を", "たべます"], hint: "Object を Verb" },
  { english: "I go to school.", words: ["がっこう", "に", "いきます"], hint: "Destination に Verb" },
  { english: "I study at the library.", words: ["としょかん", "で", "べんきょうします"], hint: "Place で Verb" },
  { english: "I came from Japan.", words: ["にほん", "から", "きました"], hint: "Origin から Verb" },
  { english: "I go to school until 3 o'clock.", words: ["さんじ", "まで", "がっこう", "に", "いきます"], hint: "Time まで Destination に Verb" },
  { english: "I drink water.", words: ["みず", "を", "のみます"], hint: "Object を Verb" },
  { english: "This is a book.", words: ["これ", "は", "ほん", "です"], hint: "Demonstrative は Noun です" },
  { english: "The weather is good.", words: ["てんき", "が", "いい", "です"], hint: "Subject が Adjective です" },
  { english: "I want to eat sushi.", words: ["すし", "を", "たべ", "たい", "です"], hint: "Object を Verb-たい です" },
  { english: "I read a book yesterday.", words: ["きのう", "ほん", "を", "よみました"], hint: "Time Object を Verb-past" },
  { english: "Please wait.", words: ["まって", "ください"], hint: "Te-form ください" },
  { english: "It is fun.", words: ["たのしい", "です"], hint: "i-Adjective です" },
  { english: "This room is quiet.", words: ["この", "へや", "は", "しずか", "です"], hint: "Modifier Noun は na-Adj です" },
  { english: "I don't understand.", words: ["わかり", "ません"], hint: "Verb-negative (masu form)" },
  { english: "Where is the station?", words: ["えき", "は", "どこ", "ですか"], hint: "Noun は Question ですか" },
  { english: "I speak Japanese.", words: ["にほんご", "を", "はなします"], hint: "Object を Verb" },
  { english: "It is not expensive.", words: ["たかく", "ない", "です"], hint: "i-Adj negative form" },
  { english: "I bought a bag.", words: ["かばん", "を", "かいました"], hint: "Object を Verb-past" },
  { english: "Let's go together.", words: ["いっしょ", "に", "いきましょう"], hint: "Together に Verb-ましょう" },
  { english: "I can swim.", words: ["およぐ", "こと", "が", "できます"], hint: "Verb こと が できます" },
  { english: "I like music.", words: ["おんがく", "が", "すき", "です"], hint: "Noun が すき です" },
  { english: "It was cold yesterday.", words: ["きのう", "は", "さむかった", "です"], hint: "Time は Adj-past です" },
  { english: "I will go to the park tomorrow.", words: ["あした", "こうえん", "に", "いきます"], hint: "Time Place に Verb" },
  { english: "Please teach me.", words: ["おしえて", "ください"], hint: "Te-form ください" },
  { english: "I want to drink coffee.", words: ["コーヒー", "を", "のみ", "たい", "です"], hint: "Object を Verb-たい です" },
  { english: "Is this your pen?", words: ["これ", "は", "あなた", "の", "ペン", "ですか"], hint: "Possessive の" },
  { english: "I wake up at 7.", words: ["しちじ", "に", "おきます"], hint: "Time に Verb" },
  { english: "The food is delicious.", words: ["りょうり", "が", "おいしい", "です"], hint: "Noun が Adjective です" },
];

export default function SentenceBuilder() {
  const [current, setCurrent] = useState(0);
  const [scrambled, setScrambled] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  useEffect(() => {
    const s = SENTENCES[current];
    setScrambled(shuffle([...s.words]));
    setAnswer([]);
    setChecked(false);
    setCorrect(false);
    setShowHint(false);
  }, [current]);

  const addWord = (word, idx) => {
    if (checked) return;
    setAnswer([...answer, word]);
    setScrambled(scrambled.filter((_, i) => i !== idx));
  };

  const removeWord = (word, idx) => {
    if (checked) return;
    setScrambled([...scrambled, word]);
    setAnswer(answer.filter((_, i) => i !== idx));
  };

  const check = () => {
    const isCorrect = answer.join("") === SENTENCES[current].words.join("");
    setCorrect(isCorrect);
    setChecked(true);
    setScore((s) => ({
      correct: s.correct + (isCorrect ? 1 : 0),
      total: s.total + 1,
    }));
    if (isCorrect) playCorrect();
    else playWrong();
  };

  const nextSentence = () => {
    setCurrent((c) => (c + 1) % SENTENCES.length);
  };

  const btnBase = {
    padding: "10px 20px",
    borderRadius: 10,
    border: "none",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  const s = SENTENCES[current];

  return (
    <div className="fade-up" style={{ paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <h2 style={{
          fontSize: 28, fontWeight: 900, color: THEME.colors.secondary,
          margin: 0, letterSpacing: 1,
        }}>
          ✍️ Build-A-Sentence
        </h2>
        <p style={{ color: THEME.colors.textLight, marginTop: 8, fontSize: 14 }}>
          Arrange the words in correct Japanese order — train your grammar instincts
        </p>
      </div>

      {/* Score + Progress */}
      <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 20 }}>
        <span style={{
          fontSize: 12, color: THEME.colors.textLight,
          background: THEME.colors.gray, padding: "4px 12px", borderRadius: 20,
        }}>
          Sentence {current + 1} / {SENTENCES.length}
        </span>
        <span style={{
          fontSize: 12, color: THEME.colors.gold, fontWeight: 700,
          background: THEME.colors.gray, padding: "4px 12px", borderRadius: 20,
        }}>
          Score: {score.correct} / {score.total}
        </span>
      </div>

      {/* English prompt */}
      <div style={{
        textAlign: "center", marginBottom: 24, padding: "20px 24px",
        background: THEME.colors.white, borderRadius: 12,
        boxShadow: THEME.shadows.card,
        border: `1px solid ${THEME.colors.border || "#E8E0D5"}`,
      }}>
        <div style={{ fontSize: 13, color: THEME.colors.textLight, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1.5 }}>
          Translate to Japanese
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: THEME.colors.secondary }}>
          "{s.english}"
        </div>
        {showHint && (
          <div style={{ marginTop: 8, fontSize: 13, color: THEME.colors.gold, fontStyle: "italic" }}>
            💡 Pattern: {s.hint}
          </div>
        )}
      </div>

      {/* Answer drop zone */}
      <div style={{
        minHeight: 64, padding: 16,
        border: `2px dashed ${checked ? (correct ? "#27AE60" : THEME.colors.primary) : (THEME.colors.border || "#E8E0D5")}`,
        borderRadius: 12,
        display: "flex", gap: 8, flexWrap: "wrap",
        justifyContent: "center", alignItems: "center",
        marginBottom: 16,
        background: checked ? (correct ? "rgba(39,174,96,0.05)" : "rgba(192,57,43,0.05)") : "transparent",
        transition: "all 0.3s ease",
      }}>
        {answer.length === 0 && (
          <span style={{ color: THEME.colors.textLight, fontSize: 14 }}>
            ↓ Tap words below to build the sentence
          </span>
        )}
        {answer.map((word, i) => (
          <button
            key={`a-${i}`}
            onClick={() => removeWord(word, i)}
            style={{
              padding: "10px 18px",
              fontSize: 20,
              fontFamily: THEME.fonts.japanese,
              background: checked ? (correct ? "#27AE60" : THEME.colors.primary) : THEME.colors.primary,
              color: "#fff",
              border: "none",
              borderRadius: 8,
              cursor: checked ? "default" : "pointer",
              transition: "all 0.2s ease",
              animation: checked ? (correct ? "none" : "shake 0.4s ease") : "none",
            }}
          >
            {word}
          </button>
        ))}
      </div>

      {/* Word tiles (scrambled) */}
      <div style={{
        display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center",
        marginBottom: 24, minHeight: 50,
      }}>
        {scrambled.map((word, i) => (
          <button
            key={`s-${i}`}
            onClick={() => addWord(word, i)}
            style={{
              padding: "10px 18px",
              fontSize: 20,
              fontFamily: THEME.fonts.japanese,
              background: THEME.colors.white,
              border: `1.5px solid ${THEME.colors.border || "#E8E0D5"}`,
              borderRadius: 8,
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
            }}
          >
            {word}
          </button>
        ))}
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
        {!checked && (
          <>
            <button
              onClick={() => setShowHint(!showHint)}
              style={{ ...btnBase, background: "transparent", color: THEME.colors.gold, border: `1.5px solid ${THEME.colors.gold}` }}
            >
              💡 Hint
            </button>
            <button
              onClick={check}
              disabled={answer.length === 0}
              style={{
                ...btnBase,
                background: answer.length > 0 ? THEME.colors.primary : THEME.colors.gray,
                color: answer.length > 0 ? "#fff" : THEME.colors.textLight,
              }}
            >
              ✅ Check Answer
            </button>
          </>
        )}

        {checked && (
          <>
            {/* Show correct answer if wrong */}
            {!correct && (
              <div style={{
                width: "100%", textAlign: "center", marginBottom: 8,
                fontSize: 16, color: THEME.colors.primary,
              }}>
                Correct: <span style={{ fontFamily: THEME.fonts.japanese, fontWeight: 700 }}>
                  {s.words.join(" ")}
                </span>
              </div>
            )}
            <div style={{
              width: "100%", textAlign: "center", marginBottom: 8,
              fontSize: 22, fontWeight: 900,
              color: correct ? "#27AE60" : THEME.colors.primary,
            }}>
              {correct ? "✅ Correct! よくできました！" : "❌ Not quite — study the pattern"}
            </div>
            <button onClick={nextSentence} style={{ ...btnBase, background: THEME.colors.primary, color: "#fff" }}>
              Next Sentence →
            </button>
          </>
        )}
      </div>

      {/* Tips */}
      <div style={{
        marginTop: 28, padding: 20, borderRadius: 12,
        background: THEME.colors.gray,
        border: `1px solid ${THEME.colors.border || "#E8E0D5"}`,
        maxWidth: 500, margin: "28px auto 0",
        fontSize: 13, color: THEME.colors.textLight, lineHeight: 1.7,
      }}>
        <strong style={{ color: THEME.colors.secondary }}>🧠 Why this works:</strong>
        <p style={{ margin: "8px 0 0 0" }}>
          Japanese word order is <strong>Subject → Object → Verb</strong> (the opposite of English).
          Building sentences forces your brain to think in Japanese order instead of translating from English.
        </p>
      </div>
    </div>
  );
}
