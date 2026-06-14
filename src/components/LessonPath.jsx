import React, { useState, useEffect } from "react";
import { theme as THEME } from "../styles/theme";
import { getDueCount } from "../utils/srs";
import VOCAB_N5 from "../data/vocab_n5";
import GRAMMAR_N5 from "../data/grammar_n5";

const lessons = [
  {
    id: "hiragana",
    num: "一",
    title: "Hiragana",
    jp: "ひらがな",
    desc: "Master the 46 basic characters used for native Japanese words.",
    total: 46,
    icon: "あ",
  },
  {
    id: "katakana",
    num: "二",
    title: "Katakana",
    jp: "カタカナ",
    desc: "Learn the 46 angular characters used for foreign loanwords.",
    total: 46,
    icon: "ア",
  },
  {
    id: "kanji",
    num: "三",
    title: "Kanji",
    jp: "漢字",
    desc: "Learn all 103 essential Chinese characters required for JLPT N5.",
    total: 103, // Adjusted to match the 103 Kanji requirement
    icon: "漢",
  },
  {
    id: "vocab",
    num: "四",
    title: "Vocabulary",
    jp: "単語",
    desc: "Memorize 800 common words crucial for everyday conversation.",
    total: 800,
    icon: "語",
  },
  {
    id: "grammar",
    num: "五",
    title: "Grammar",
    jp: "文法",
    desc: "Understand the 80 core rules and sentence patterns for N5.",
    total: 80,
    icon: "文",
  },
  {
    id: "reading",
    num: "六",
    title: "Reading",
    jp: "読解",
    desc: "Practice reading comprehension with 10 short Japanese passages.",
    total: 10,
    icon: "読",
  },
  {
    id: "listening",
    num: "七",
    title: "Listening",
    jp: "聴解",
    desc: "Train your ears to understand spoken Japanese sentences.",
    total: 1, // Represents 1 completed listening quiz
    icon: "聴",
  },
  {
    id: "mocktest",
    num: "八",
    title: "Mock Exam",
    jp: "もぎしけん",
    desc: "A full 30-minute timed JLPT N5 practice test.",
    total: 100, // Percentage based
    icon: "💯",
  },
];

export default function LessonPath({ progress, onSelect, activeLesson }) {
  const [vocabDue, setVocabDue] = useState(0);
  const [grammarDue, setGrammarDue] = useState(0);

  useEffect(() => {
    setVocabDue(getDueCount(VOCAB_N5.map((v) => `vocab:${v.jp}`)));
    setGrammarDue(getDueCount(GRAMMAR_N5.map((g) => `grammar:${g.id}`)));
  }, []);

  const totalDue = vocabDue + grammarDue;

  return (
    <div className="fade-up" style={{ paddingBottom: 60 }}>
      {/* Dynamic Grid Styles for Mobile */}
      <style>{`
        .lesson-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        @media (max-width: 768px) {
          .lesson-grid {
            grid-template-columns: 1fr !important;
            gap: 16px;
          }
        }
      `}</style>

      {/* Hero Section */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <h1 style={{ 
          fontSize: 64, 
          fontWeight: 900, 
          color: THEME.colors.secondary, 
          margin: "0 0 16px 0",
          fontFamily: "'Shippori Mincho', 'Georgia', serif",
          letterSpacing: 4 
        }}>
          日本語
        </h1>
        <h2 style={{ 
          fontSize: 24, 
          fontWeight: 800, 
          color: THEME.colors.primary, 
          margin: 0,
          textTransform: "uppercase",
          letterSpacing: 2
        }}>
          N5 Mastery Path
        </h2>
        <p style={{ color: THEME.colors.textLight, marginTop: 12, fontSize: 16, fontWeight: 500 }}>
          Follow the modules below to prepare for your JLPT N5 exam.
        </p>
      </div>

      {/* Simple SVG Brushstroke Divider */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
        <svg width="200" height="20" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 10 Q 100 -5 190 10" stroke={THEME.colors.primary} strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      {/* Today's Review Card */}
      <div style={{
        background: `linear-gradient(135deg, ${THEME.colors.primary}, ${THEME.colors.gold})`,
        borderRadius: 16,
        padding: "32px 28px",
        color: "#fff",
        marginBottom: 40,
        boxShadow: THEME.shadows.floating,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center"
      }}>
        <h2 style={{ fontSize: 24, margin: "0 0 8px 0", letterSpacing: 1 }}>📋 Today's Review</h2>
        <p style={{ fontSize: 16, opacity: 0.9, margin: "0 0 24px 0" }}>
          {totalDue > 0 ? `${totalDue} items are ready for your spaced repetition review.` : "You're all caught up for today! Great job."}
        </p>
        
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <button 
            onClick={() => onSelect("vocab")}
            disabled={vocabDue === 0}
            style={{
              padding: "12px 24px",
              borderRadius: 30,
              border: "none",
              background: THEME.colors.white,
              color: THEME.colors.primary,
              fontSize: 15,
              fontWeight: 800,
              cursor: vocabDue > 0 ? "pointer" : "not-allowed",
              opacity: vocabDue > 0 ? 1 : 0.6,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "transform 0.2s ease"
            }}
            onMouseEnter={e => { if(vocabDue > 0) e.currentTarget.style.transform = "scale(1.05)" }}
            onMouseLeave={e => { if(vocabDue > 0) e.currentTarget.style.transform = "scale(1)" }}
          >
            Vocab ({vocabDue})
          </button>
          
          <button 
            onClick={() => onSelect("grammar")}
            disabled={grammarDue === 0}
            style={{
              padding: "12px 24px",
              borderRadius: 30,
              border: "none",
              background: THEME.colors.white,
              color: THEME.colors.primary,
              fontSize: 15,
              fontWeight: 800,
              cursor: grammarDue > 0 ? "pointer" : "not-allowed",
              opacity: grammarDue > 0 ? 1 : 0.6,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "transform 0.2s ease"
            }}
            onMouseEnter={e => { if(grammarDue > 0) e.currentTarget.style.transform = "scale(1.05)" }}
            onMouseLeave={e => { if(grammarDue > 0) e.currentTarget.style.transform = "scale(1)" }}
          >
            Grammar ({grammarDue})
          </button>
        </div>
      </div>

      {/* Lesson Cards Grid */}
      <div className="lesson-grid">
        {lessons.map((lesson, index) => {
          const currentScore = progress[lesson.id] || 0;
          const isCompleted = currentScore >= lesson.total;
          
          // Determine if section is locked (locked if previous section is < 100%)
          // Except the first lesson which is never locked
          let isLocked = false;
          if (index > 0) {
            const prevLesson = lessons[index - 1];
            const prevScore = progress[prevLesson.id] || 0;
            if (prevScore < prevLesson.total) {
              isLocked = true;
            }
          }

          const pct = Math.min(100, Math.round((currentScore / lesson.total) * 100));

          return (
            <div
              key={lesson.id}
              className="fade-up"
              onClick={() => {
                if (!isLocked) onSelect(lesson.id);
              }}
              style={{
                background: THEME.colors.white,
                borderRadius: 16,
                padding: 24,
                cursor: isLocked ? "not-allowed" : "pointer",
                border: `2px solid ${THEME.colors.white}`,
                borderLeft: `6px solid ${isLocked ? THEME.colors.gray : THEME.colors.primary}`,
                boxShadow: THEME.shadows.card,
                transition: "all 0.2s ease",
                opacity: isLocked ? 0.6 : 1,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                animationDelay: `${index * 0.05}s`,
                filter: isLocked ? "grayscale(100%)" : "none"
              }}
              onMouseEnter={e => {
                if (!isLocked) {
                  e.currentTarget.style.borderColor = `${THEME.colors.primary}44`;
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = THEME.shadows.floating;
                }
              }}
              onMouseLeave={e => {
                if (!isLocked) {
                  e.currentTarget.style.borderColor = THEME.colors.white;
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = THEME.shadows.card;
                }
              }}
            >
              {/* Top Row: Icon/Num and Status Badges */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    background: isLocked ? THEME.colors.gray : `${THEME.colors.primary}11`,
                    color: isLocked ? THEME.colors.textLight : THEME.colors.primary,
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    fontWeight: 900
                  }}>
                    {lesson.icon}
                  </div>
                  <span style={{ fontSize: 13, color: THEME.colors.textLight, fontWeight: 800, letterSpacing: 2 }}>
                    LESSON {lesson.num}
                  </span>
                </div>

                {/* Status Icons */}
                {isLocked ? (
                  <div style={{ color: THEME.colors.textLight, fontSize: 18 }} title="Complete previous lessons to unlock">
                    🔒
                  </div>
                ) : isCompleted ? (
                  <div style={{ 
                    background: THEME.colors.primary, 
                    color: THEME.colors.white, 
                    borderRadius: '50%', 
                    width: 24, 
                    height: 24, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 'bold',
                    boxShadow: '0 2px 8px rgba(192, 57, 43, 0.4)'
                  }}>
                    ✓
                  </div>
                ) : null}
              </div>

              {/* Title & Description */}
              <div style={{ marginBottom: 4 }}>
                <span style={{ fontSize: 22, fontWeight: 900, color: THEME.colors.secondary, marginRight: 8 }}>
                  {lesson.title}
                </span>
                <span style={{ fontSize: 14, color: THEME.colors.textLight, fontWeight: 700 }}>
                  {lesson.jp}
                </span>
              </div>
              <p style={{ color: THEME.colors.textLight, fontSize: 14, margin: "8px 0 24px 0", lineHeight: 1.5, flex: 1 }}>
                {lesson.desc}
              </p>

              {/* Progress Bar (Hidden if locked) */}
              {!isLocked && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 800, marginBottom: 8, color: THEME.colors.secondary }}>
                    <span>{pct}% Completed</span>
                    <span>{currentScore} / {lesson.total}</span>
                  </div>
                  <div style={{ height: 6, background: THEME.colors.gray, borderRadius: 3, overflow: "hidden" }}>
                    <div style={{
                      height: "100%",
                      width: `${pct}%`,
                      background: THEME.colors.primary,
                      borderRadius: 3,
                      transition: "width 0.4s ease"
                    }} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
