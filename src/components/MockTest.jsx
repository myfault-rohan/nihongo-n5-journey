import React, { useState, useEffect } from 'react';
import VOCAB_N5 from '../data/vocab_n5';
import GRAMMAR_N5 from '../data/grammar_n5';
import READING_N5 from '../data/reading_n5';
import { theme as THEME } from '../styles/theme';
import { playLevelUp } from '../utils/sounds';

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

const SECTION_TIME = 25 * 60; // 25 minutes per section

export default function MockTest({ onProgress }) {
  const [activeSection, setActiveSection] = useState(0); // 0=Intro, 1=Vocab, 2=Grammar, 3=Reading, 4=Result, 5=Review
  const [timeLeft, setTimeLeft] = useState(SECTION_TIME);
  const [examData, setExamData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [scoreInfo, setScoreInfo] = useState({ correct: 0, total: 55, scaled: 0 });

  useEffect(() => {
    let timer;
    if (activeSection >= 1 && activeSection <= 3 && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(timer);
            advanceSection();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeSection, timeLeft]);

  const advanceSection = () => {
    if (activeSection === 1) {
      setActiveSection(2);
      setTimeLeft(SECTION_TIME);
      window.scrollTo(0, 0);
    } else if (activeSection === 2) {
      setActiveSection(3);
      setTimeLeft(SECTION_TIME);
      window.scrollTo(0, 0);
    } else if (activeSection === 3) {
      submitExam();
    }
  };

  const generateExam = () => {
    // Vocab: 25 questions
    const vocabData = shuffle(VOCAB_N5).slice(0, 25).map((v, i) => {
      const wrongs = shuffle(VOCAB_N5.filter(x => x.en !== v.en)).slice(0, 3).map(x => x.en);
      return { id: `v${i}`, type: 'vocab', q: v.jp, answer: v.en, options: shuffle([v.en, ...wrongs]) };
    });

    // Grammar: 20 questions
    const grammarData = shuffle(GRAMMAR_N5).slice(0, 20).map((g, i) => {
      const wrongs = shuffle(GRAMMAR_N5.filter(x => x.meaning !== g.meaning)).slice(0, 3).map(x => x.meaning);
      return { id: `g${i}`, type: 'grammar', q: g.example, subQ: g.romaji, answer: g.meaning, options: shuffle([g.meaning, ...wrongs]) };
    });

    // Reading: 5 passages
    const readingData = shuffle(READING_N5).slice(0, 5).map((r, i) => {
      return {
        id: `r${i}`,
        type: 'reading',
        passage: r.japanese,
        title: r.title,
        questions: r.questions.map((q, qi) => ({
          id: `rq${i}_${qi}`,
          q: q.question,
          options: q.options,
          answer: q.answer
        }))
      };
    });

    setExamData({ vocab: vocabData, grammar: grammarData, reading: readingData });
    setAnswers({});
    setActiveSection(1);
    setTimeLeft(SECTION_TIME);
    window.scrollTo(0, 0);
  };

  const selectAnswer = (qId, optionVal) => {
    if (activeSection >= 4) return;
    setAnswers(prev => ({ ...prev, [qId]: optionVal }));
  };

  const submitExam = () => {
    let correctCount = 0;
    const totalCount = 25 + 20 + 10; // 55 total questions

    examData.vocab.forEach(q => { if (answers[q.id] === q.answer) correctCount++; });
    examData.grammar.forEach(q => { if (answers[q.id] === q.answer) correctCount++; });
    examData.reading.forEach(r => {
      r.questions.forEach(q => { if (answers[q.id] === q.answer) correctCount++; });
    });

    // JLPT Language Knowledge (Vocab/Grammar/Reading) is scored out of 120 points.
    // N5 passing score for Language Knowledge is 38/120. Total N5 passing score is 80/180 (including listening).
    const scaledScore = Math.round((correctCount / totalCount) * 120);

    setScoreInfo({ correct: correctCount, total: totalCount, scaled: scaledScore });
    setActiveSection(4); // Result screen
    if (onProgress) onProgress(1); // Mark mock test module complete
    
    // Play level up sound if passing (approx > 40%)
    if (correctCount / totalCount >= 0.4) playLevelUp();
    
    window.scrollTo(0, 0);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // ----------------------------------------------------------------------
  // RENDER: Intro Screen
  // ----------------------------------------------------------------------
  if (activeSection === 0) {
    return (
      <div className="fade-up" style={{ paddingBottom: 60 }}>
        <div style={{ marginBottom: 32, textAlign: "center" }}>
          <div style={{ fontSize: 13, letterSpacing: 5, color: THEME.colors.primary, fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>
            Final Challenge
          </div>
          <h2 style={{ fontSize: 32, fontWeight: 900, color: THEME.colors.secondary, margin: "0 0 16px", fontFamily: THEME.fonts.main }}>
            JLPT N5 Mock Exam
          </h2>
          <p style={{ color: THEME.colors.textLight, margin: 0, fontSize: 15 }}>
            Simulate the real JLPT N5 Language Knowledge section.
          </p>
        </div>

        <div style={{
          background: THEME.colors.white,
          border: "2px solid #E8E0D5",
          borderRadius: 24,
          padding: 40,
          maxWidth: 600,
          margin: "0 auto",
          boxShadow: THEME.shadows.card,
        }}>
          <h3 style={{ fontSize: 20, fontWeight: 900, color: THEME.colors.secondary, marginBottom: 24, borderBottom: "2px solid #E8E0D5", paddingBottom: 12 }}>
            Exam Structure
          </h3>
          
          <ul style={{ listStyle: "none", padding: 0, margin: 0, marginBottom: 32, display: "flex", flexDirection: "column", gap: 16 }}>
            <li style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 16, fontWeight: 700, color: THEME.colors.secondary }}>
              <div style={{ background: `${THEME.colors.primary}11`, color: THEME.colors.primary, padding: "8px 16px", borderRadius: 8, width: 90, textAlign: "center" }}>25 Min</div>
              <div>Section 1: Vocabulary (25 Questions)</div>
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 16, fontWeight: 700, color: THEME.colors.secondary }}>
              <div style={{ background: `${THEME.colors.primary}11`, color: THEME.colors.primary, padding: "8px 16px", borderRadius: 8, width: 90, textAlign: "center" }}>25 Min</div>
              <div>Section 2: Grammar (20 Questions)</div>
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 16, fontWeight: 700, color: THEME.colors.secondary }}>
              <div style={{ background: `${THEME.colors.primary}11`, color: THEME.colors.primary, padding: "8px 16px", borderRadius: 8, width: 90, textAlign: "center" }}>25 Min</div>
              <div>Section 3: Reading (5 Passages)</div>
            </li>
          </ul>

          <div style={{ background: "#F9F5F0", padding: 16, borderRadius: 12, borderLeft: `4px solid ${THEME.colors.gold}`, fontSize: 14, color: THEME.colors.textLight, fontWeight: 700, marginBottom: 32 }}>
            ⚠️ Sections will automatically advance when the timer hits zero. You cannot return to a previous section. Passing score is 80/120.
          </div>

          <button 
            onClick={generateExam}
            style={{ display: 'block', width: '100%', padding: "16px", background: THEME.colors.primary, color: THEME.colors.white, border: 'none', borderRadius: 30, fontSize: 18, fontWeight: 900, cursor: 'pointer', boxShadow: "0 8px 24px rgba(192, 57, 43, 0.4)", transition: "all 0.2s ease" }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            Start Mock Exam
          </button>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // RENDER: Result Screen
  // ----------------------------------------------------------------------
  if (activeSection === 4) {
    const passed = scoreInfo.scaled >= 80;
    return (
      <div className="fade-up" style={{ paddingBottom: 60 }}>
        <h2 style={{ fontSize: 32, fontWeight: 900, color: THEME.colors.secondary, marginBottom: 32, fontFamily: THEME.fonts.main, textAlign: "center" }}>
          Exam Results
        </h2>
        
        <div style={{
          background: THEME.colors.white,
          border: "2px solid #E8E0D5",
          borderRadius: 24,
          padding: 48,
          textAlign: "center",
          maxWidth: 540,
          margin: "0 auto",
          boxShadow: THEME.shadows.card,
        }}>
          <div style={{ 
            fontSize: 24, 
            fontWeight: 900, 
            color: passed ? "#27AE60" : THEME.colors.primary, 
            marginBottom: 16,
            background: passed ? "#eafaf1" : `${THEME.colors.primary}11`,
            display: "inline-block",
            padding: "8px 24px",
            borderRadius: 30
          }}>
            {passed ? "合格 PASSED" : "不合格 FAILED"}
          </div>

          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 8, marginBottom: 8 }}>
            <div style={{ fontSize: 96, fontWeight: 900, color: THEME.colors.gold, lineHeight: 1, fontFamily: "'Shippori Mincho', 'Georgia', serif" }}>
              {scoreInfo.scaled}
            </div>
            <div style={{ fontSize: 32, color: THEME.colors.textLight, fontWeight: 800 }}>
              / 120
            </div>
          </div>
          
          <div style={{ fontSize: 16, color: THEME.colors.textLight, marginBottom: 40, fontWeight: 700 }}>
            Raw Score: {scoreInfo.correct} / {scoreInfo.total} correct
          </div>

          <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
            <button 
              onClick={() => setActiveSection(5)} 
              style={{
                padding: "16px 32px", borderRadius: 30, background: THEME.colors.white, border: `2px solid ${THEME.colors.primary}`, color: THEME.colors.primary, fontWeight: 900, fontSize: 16, cursor: "pointer", transition: "all 0.2s"
              }}
              onMouseEnter={e => e.currentTarget.style.background = `${THEME.colors.primary}11`}
              onMouseLeave={e => e.currentTarget.style.background = THEME.colors.white}
            >
              Review Answers
            </button>
            <button 
              onClick={() => setActiveSection(0)} 
              style={{
                padding: "16px 32px", borderRadius: 30, background: THEME.colors.primary, border: `2px solid ${THEME.colors.primary}`, color: THEME.colors.white, fontWeight: 900, fontSize: 16, cursor: "pointer", transition: "all 0.2s", boxShadow: "0 4px 12px rgba(192, 57, 43, 0.3)"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // RENDER: Review Screen
  // ----------------------------------------------------------------------
  if (activeSection === 5) {
    const renderReviewQ = (q, num) => {
      const userAns = answers[q.id];
      const isCorrect = userAns === q.answer;
      return (
        <div key={q.id} style={{ background: THEME.colors.white, border: "1.5px solid #E8E0D5", borderRadius: 16, padding: 24, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: THEME.colors.textLight }}>Q{num}</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: isCorrect ? "#27AE60" : THEME.colors.primary }}>{isCorrect ? "✓ Correct" : "✗ Incorrect"}</div>
          </div>
          <div style={{ fontSize: 24, fontWeight: 900, color: THEME.colors.secondary, marginBottom: 16, fontFamily: "'Shippori Mincho', 'Georgia', serif" }}>{q.q}</div>
          
          <div style={{ background: "#F9F5F0", padding: 16, borderRadius: 8, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: THEME.colors.secondary }}>
              <span style={{ color: THEME.colors.textLight, marginRight: 8, display: "inline-block", width: 80 }}>Your Ans:</span>
              <span style={{ color: isCorrect ? "#27AE60" : THEME.colors.primary }}>{userAns || "(Skipped)"}</span>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: THEME.colors.secondary }}>
              <span style={{ color: THEME.colors.textLight, marginRight: 8, display: "inline-block", width: 80 }}>Correct:</span>
              <span style={{ color: "#27AE60" }}>{q.answer}</span>
            </div>
          </div>
        </div>
      );
    };

    let qCounter = 1;

    return (
      <div className="fade-up" style={{ paddingBottom: 100, maxWidth: 600, margin: "0 auto" }}>
        <h2 style={{ fontSize: 32, fontWeight: 900, color: THEME.colors.secondary, marginBottom: 32, fontFamily: THEME.fonts.main, textAlign: "center" }}>
          Exam Review
        </h2>

        <h3 style={sectionHeaderStyle}>Section 1: Vocabulary</h3>
        {examData.vocab.map(q => renderReviewQ(q, qCounter++))}

        <h3 style={sectionHeaderStyle}>Section 2: Grammar</h3>
        {examData.grammar.map(q => renderReviewQ(q, qCounter++))}

        <h3 style={sectionHeaderStyle}>Section 3: Reading</h3>
        {examData.reading.map((r, i) => (
          <div key={r.id} style={{ marginBottom: 32 }}>
            <div style={{ background: THEME.colors.white, border: "1.5px solid #E8E0D5", borderRadius: 16, padding: 24, marginBottom: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: THEME.colors.textLight, marginBottom: 12 }}>Passage {i + 1}</div>
              <div style={{ fontSize: 20, lineHeight: 1.8, color: THEME.colors.secondary, fontFamily: "'Shippori Mincho', 'Georgia', serif" }}>{r.passage}</div>
            </div>
            {r.questions.map(q => renderReviewQ(q, qCounter++))}
          </div>
        ))}

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <button 
            onClick={() => setActiveSection(0)} 
            style={{ padding: "16px 40px", borderRadius: 30, background: THEME.colors.primary, border: "none", color: THEME.colors.white, fontWeight: 900, fontSize: 18, cursor: "pointer", boxShadow: "0 8px 24px rgba(192, 57, 43, 0.4)" }}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // RENDER: Active Exam Sections
  // ----------------------------------------------------------------------
  const isVocab = activeSection === 1;
  const isGrammar = activeSection === 2;
  const isReading = activeSection === 3;
  
  const sectionTitle = isVocab ? "Vocabulary" : isGrammar ? "Grammar" : "Reading";
  const sectionTotal = isVocab ? 25 : isGrammar ? 20 : 5;

  return (
    <div style={{ paddingBottom: 100 }}>
      {/* Sticky Header with Timer */}
      <div style={{ 
        position: 'sticky', top: 60, background: `${THEME.colors.white}f5`, backdropFilter: 'blur(8px)', 
        padding: '16px 24px', zIndex: 90, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: "1.5px solid #E8E0D5", margin: '-40px -24px 32px -24px'
      }}>
        <div style={{ fontWeight: 900, color: THEME.colors.secondary, fontSize: 20, textTransform: "uppercase", letterSpacing: 1 }}>
          S{activeSection}: {sectionTitle}
        </div>
        <div style={{ 
          background: timeLeft < 300 ? THEME.colors.primary : "#F9F5F0", 
          color: timeLeft < 300 ? THEME.colors.white : THEME.colors.secondary, 
          padding: '8px 20px', borderRadius: 20, fontWeight: 900, fontSize: 18,
          transition: "all 0.3s ease"
        }}>
          ⏱ {formatTime(timeLeft)}
        </div>
      </div>

      <div className="fade-up" style={{ maxWidth: 640, margin: '0 auto' }}>
        
        {isVocab && examData.vocab.map((q, idx) => (
          <QuestionCard key={q.id} num={idx + 1} q={q.q} options={q.options} selected={answers[q.id]} onSelect={(v) => selectAnswer(q.id, v)} />
        ))}

        {isGrammar && examData.grammar.map((q, idx) => (
          <QuestionCard key={q.id} num={idx + 1} q={q.q} subQ={q.subQ} options={q.options} selected={answers[q.id]} onSelect={(v) => selectAnswer(q.id, v)} />
        ))}

        {isReading && examData.reading.map((r, i) => (
          <div key={r.id} style={{ marginBottom: 48 }}>
            <div style={{ background: THEME.colors.white, border: "2px solid #E8E0D5", borderRadius: 24, padding: 32, marginBottom: 24, boxShadow: THEME.shadows.card }}>
              <div style={{ fontSize: 14, color: THEME.colors.textLight, fontWeight: 800, marginBottom: 16 }}>PASSAGE {i + 1} OF 5</div>
              <p style={{ fontSize: 22, lineHeight: 1.8, color: THEME.colors.secondary, fontWeight: 700, margin: 0, fontFamily: "'Shippori Mincho', 'Georgia', serif" }}>
                {r.passage}
              </p>
            </div>
            {r.questions.map((q, qi) => (
              <QuestionCard key={q.id} num={qi + 1} q={q.q} options={q.options} selected={answers[q.id]} onSelect={(v) => selectAnswer(q.id, v)} />
            ))}
          </div>
        ))}

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <button 
            onClick={advanceSection}
            style={{ padding: '16px 48px', background: THEME.colors.primary, color: THEME.colors.white, border: 'none', borderRadius: 30, fontSize: 18, fontWeight: 900, cursor: 'pointer', boxShadow: '0 8px 24px rgba(192, 57, 43, 0.4)', transition: "transform 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            {activeSection === 3 ? "Submit Exam" : `Proceed to Section ${activeSection + 1}`}
          </button>
        </div>
      </div>
    </div>
  );
}

const sectionHeaderStyle = {
  fontSize: 24,
  fontWeight: 900,
  color: THEME.colors.primary,
  borderBottom: "2px dashed #E8E0D5",
  paddingBottom: 12,
  marginBottom: 24,
  marginTop: 48,
};

function QuestionCard({ num, q, subQ, options, selected, onSelect }) {
  return (
    <div style={{ background: THEME.colors.white, border: "2px solid #E8E0D5", borderRadius: 24, padding: 32, marginBottom: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
      <div style={{ fontSize: 14, color: THEME.colors.textLight, fontWeight: 800, marginBottom: 16 }}>Question {num}</div>
      <div style={{ fontSize: 32, fontWeight: 900, color: THEME.colors.secondary, marginBottom: subQ ? 12 : 24, fontFamily: "'Shippori Mincho', 'Georgia', serif" }}>{q}</div>
      {subQ && <div style={{ fontSize: 16, color: THEME.colors.textLight, marginBottom: 24, fontWeight: 700 }}>{subQ}</div>}
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
        {options.map((opt, i) => {
          const isSelected = selected === opt;
          return (
            <button
              key={i}
              onClick={() => onSelect(opt)}
              style={{
                padding: '16px 24px',
                textAlign: 'left',
                background: isSelected ? `${THEME.colors.primary}11` : THEME.colors.white,
                border: `2px solid ${isSelected ? THEME.colors.primary : "#E8E0D5"}`,
                borderRadius: 16,
                cursor: 'pointer',
                fontSize: 18,
                fontWeight: isSelected ? 800 : 700,
                color: isSelected ? THEME.colors.primary : THEME.colors.secondary,
                transition: "all 0.2s ease",
                boxShadow: isSelected ? "0 4px 12px rgba(192, 57, 43, 0.1)" : "none",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
              onMouseEnter={e => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = THEME.colors.primary;
                  e.currentTarget.style.background = "#F9F5F0";
                }
              }}
              onMouseLeave={e => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = "#E8E0D5";
                  e.currentTarget.style.background = THEME.colors.white;
                }
              }}
            >
              {opt}
              {isSelected && <div style={{ width: 16, height: 16, borderRadius: "50%", background: THEME.colors.primary }} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
