import React, { useState, useEffect, useRef } from "react";
import LessonPath from "./components/LessonPath";
import CharChart from "./components/CharChart";
import KanjiChart from "./components/KanjiChart";
import Flashcards from "./components/Flashcards";
import Quiz from "./components/Quiz";
import Grammar from "./components/Grammar";
import Reading from "./components/Reading";
import ListeningQuiz from "./components/ListeningQuiz";
import MockTest from "./components/MockTest";
import WritingPractice from "./components/WritingPractice";
import Shadowing from "./components/Shadowing";
import SentenceBuilder from "./components/SentenceBuilder";
import Login from "./components/Login";
import { lightTheme, darkTheme } from "./styles/theme";
import { playNav } from "./utils/sounds";
import { loadSRSData, saveSRSData } from "./utils/srs";

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem('nihongo-auth-token') || null);
  const [view, setView] = useState("home");
  const [isDark, setIsDark] = useState(() => localStorage.getItem('nihongo-dark-mode') === 'true');
  const THEME = isDark ? darkTheme : lightTheme;

  const toggleDark = () => {
    setIsDark(prev => {
      const next = !prev;
      localStorage.setItem('nihongo-dark-mode', String(next));
      if (token) {
        fetch('/api/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ theme: next ? 'dark' : 'light' })
        }).catch(console.error);
      }
      return next;
    });
  };

  const handleNav = (id) => {
    playNav();
    setView(id);
  };
  const [progress, setProgress] = useState({
    hiragana: 0, katakana: 0, kanji: 0, vocab: 0,
    grammar: 0, reading: 0, listening: 0, mocktest: 0,
  });

  const [showSakura, setShowSakura] = useState(false);
  const prevPercentage = useRef(0);

  // Fetch initial data on login
  useEffect(() => {
    if (!token) return;
    fetch('/api/data', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setProgress(data.data.progress);
        setIsDark(data.data.theme === 'dark');
        localStorage.setItem('nihongo-dark-mode', String(data.data.theme === 'dark'));
        saveSRSData(data.data.srsData || {});
      }
    })
    .catch(() => {
      console.error("Could not fetch data from backend. Using local storage.");
    });
  }, [token]);

  const currentPercentage = Math.round(
    ((progress.hiragana / 46) + 
     (progress.katakana / 46) + 
     (progress.kanji / 94) + 
     (progress.vocab / 800) + 
     (progress.grammar / 80) + 
     (progress.reading / 10) + 
     (progress.listening / 1) + 
     (progress.mocktest / 100)) / 8 * 100
  );

  useEffect(() => {
    if (currentPercentage > prevPercentage.current && prevPercentage.current !== 0) {
      setShowSakura(true);
      setTimeout(() => setShowSakura(false), 3000);
    }
    prevPercentage.current = currentPercentage;
  }, [currentPercentage]);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "hiragana", label: "Hiragana" },
    { id: "katakana", label: "Katakana" },
    { id: "kanji", label: "Kanji" },
    { id: "vocab", label: "Vocabulary" },
    { id: "grammar", label: "Grammar" },
    { id: "writing", label: "Writing" },
    { id: "reading", label: "Reading" },
    { id: "listening", label: "Listening" },
    { id: "shadowing", label: "Shadowing" },
    { id: "builder", label: "Sentences" },
    { id: "quiz", label: "Quiz" },
    { id: "mocktest", label: "Mock Test" },
  ];

  // For the SVG progress ring
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const updateProgress = (key, value) => {
    setProgress((prev) => {
      const next = { ...prev, [key]: Math.max(prev[key], value) };
      
      // Async sync to backend
      if (token) {
        fetch('/api/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ progress: next })
        }).catch(console.error);
      }
      return next;
    });
  };

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('nihongo-auth-token', newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('nihongo-auth-token');
  };

  if (!token) {
    return <Login onLogin={handleLogin} />;
  }

  const strokeDashoffset = circumference - (currentPercentage / 100) * circumference;

  return (
    <div style={{ minHeight: "100vh", background: THEME.colors.background || THEME.colors.bg || "#F9F5F0", fontFamily: THEME.fonts.main, color: THEME.colors.text || THEME.colors.secondary || "#1a1a1a" }}>
      
      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .fade-up {
          animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .sakura-container {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          pointer-events: none;
          z-index: 9999;
          overflow: hidden;
        }
        .sakura-petal {
          position: absolute;
          top: -10%;
          font-size: 1.5rem;
          animation: sakuraFall linear 3s forwards;
        }
        @keyframes sakuraFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }

        @keyframes floatUp {
          0% { transform: translateY(100vh) scale(0); opacity: 0; }
          10% { opacity: 0.5; transform: translateY(90vh) scale(1); }
          90% { opacity: 0.2; }
          100% { transform: translateY(-10vh) scale(0.5); opacity: 0; }
        }

        @keyframes waveBar {
          0% { height: 4px; }
          100% { height: 28px; }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }

        * { transition: background-color 0.4s ease, color 0.3s ease, border-color 0.3s ease; }

        .nav-container::-webkit-scrollbar {
          height: 4px;
        }
        .nav-container::-webkit-scrollbar-thumb {
          background-color: #ddd;
          border-radius: 4px;
        }

        @media (max-width: 768px) {
          .nav-container {
            flex-wrap: wrap !important;
            justify-content: center !important;
            height: auto !important;
            padding-bottom: 10px;
          }
          header {
            flex-direction: column;
            height: auto !important;
            padding: 15px !important;
            gap: 15px;
          }
          main {
            padding: 20px 15px !important;
          }
          /* Make all grid containers single column on mobile */
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
          /* Reduce font sizes slightly */
          h2 { font-size: 24px !important; }
          p { font-size: 14px !important; }
        }
      `}</style>

      {showSakura && (
        <div className="sakura-container">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="sakura-petal" style={{
              left: `${Math.random() * 100}vw`,
              animationDelay: `${Math.random() * 0.5}s`,
              fontSize: `${1 + Math.random()}rem`,
            }}>🌸</div>
          ))}
        </div>
      )}

      {/* Floating particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div key={`p-${i}`} style={{
          position: 'fixed',
          width: `${3 + (i % 3)}px`,
          height: `${3 + (i % 3)}px`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0,
          left: `${5 + (i * 6.3) % 90}%`,
          animation: `floatUp ${12 + (i % 5) * 4}s linear ${i * 1.2}s infinite`,
          background: isDark
            ? `rgba(240, 192, 64, ${0.12 + (i % 3) * 0.08})`
            : `rgba(255, 255, 255, ${0.35 + (i % 3) * 0.15})`,
        }} />
      ))}

      {/* FIXED FLOATING CIRCLE (SVG RING) */}
      <div 
        onClick={() => setView("home")}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 60,
          height: 60,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: THEME.colors.white,
          borderRadius: '50%',
          boxShadow: `0 4px 15px ${THEME.colors.gold}44`,
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = `0 6px 20px ${THEME.colors.gold}66`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = `0 4px 15px ${THEME.colors.gold}44`;
        }}
        title="Return to Home Dashboard"
      >
        <svg width="60" height="60" style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}>
          <circle cx="30" cy="30" r={radius} stroke="#eee" strokeWidth="4" fill="none" />
          <circle 
            cx="30" cy="30" r={radius} 
            stroke={THEME.colors.gold} 
            strokeWidth="4" fill="none" 
            strokeDasharray={circumference} 
            strokeDashoffset={strokeDashoffset} 
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.5s ease-out' }} 
          />
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: THEME.colors.gold, fontWeight: 900, lineHeight: 1 }}>
          <span style={{ fontSize: 13 }}>{currentPercentage}%</span>
          <span style={{ fontSize: 9, marginTop: 2 }}>N5</span>
        </div>
      </div>

      <header style={{
        background: THEME.colors.cardBg || THEME.colors.white,
        borderBottom: THEME.borders?.divider || "1px solid #eee",
        padding: "0 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: 70,
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: THEME.shadows?.header || "0 2px 10px rgba(0,0,0,0.05)",
      }}>
        <div
          onClick={() => setView("home")}
          style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", flexShrink: 0 }}
        >
          <div style={{
            width: 40,
            height: 40,
            background: THEME.colors.primary,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            color: THEME.colors.white,
            fontWeight: 900,
            boxShadow: 'inset 0 -2px 0 rgba(0,0,0,0.1)'
          }}>
            日
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 18, color: THEME.colors.secondary || "#1a1a1a", lineHeight: 1.1 }}>Nihongo</div>
            <div style={{ fontSize: 11, color: THEME.colors.gold, fontWeight: 800, letterSpacing: 2 }}>N5 JOURNEY</div>
          </div>
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={toggleDark}
          style={{
            background: 'none', border: 'none', fontSize: 22, cursor: 'pointer',
            transition: 'transform 0.3s ease', padding: 4,
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2) rotate(20deg)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? '☀️' : '🌙'}
        </button>

        <nav className="nav-container" style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: 'center', flex: 1, padding: '10px 1rem' }}>
          {navItems.map((n) => (
            <button
              key={n.id}
              onClick={() => handleNav(n.id)}
              style={{
                padding: "8px 14px",
                borderRadius: 20,
                border: "none",
                background: view === n.id ? THEME.colors.primary : "transparent",
                color: view === n.id ? "#fff" : THEME.colors.textLight || "#888",
                fontWeight: view === n.id ? 800 : 600,
                fontSize: 14,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => {
                if (view !== n.id) {
                  e.currentTarget.style.color = THEME.colors.primary;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={e => {
                if (view !== n.id) {
                  e.currentTarget.style.color = THEME.colors.textLight || "#888";
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
            >
              {n.label}
            </button>
          ))}
        </nav>
        
        <button
          onClick={handleLogout}
          style={{
            background: 'none', border: 'none', fontSize: 13, cursor: 'pointer',
            color: THEME.colors.textLight || "#888", fontWeight: 700, padding: "8px 16px",
            borderRadius: 20, transition: "background 0.2s",
            alignSelf: 'center'
          }}
          onMouseEnter={e => e.currentTarget.style.background = THEME.colors.gray || '#f5f5f5'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}
        >
          Logout
        </button>
      </header>

      <main className="fade-up" style={{ padding: "40px 24px", maxWidth: 850, margin: "0 auto" }}>
        {view === "home" && <LessonPath progress={progress} onSelect={handleNav} activeLesson={null} />}
        {view === "hiragana" && <CharChart type="hiragana" onProgress={(val) => updateProgress("hiragana", val)} />}
        {view === "katakana" && <CharChart type="katakana" onProgress={(val) => updateProgress("katakana", val)} />}
        {view === "kanji" && <KanjiChart onProgress={(val) => updateProgress("kanji", val)} />}
        {view === "vocab" && <Flashcards onProgress={(val) => updateProgress("vocab", val)} />}
        {view === "grammar" && <Grammar onProgress={(val) => updateProgress("grammar", val)} />}
        {view === "writing" && <WritingPractice />}
        {view === "reading" && <Reading onProgress={(val) => updateProgress("reading", val)} />}
        {view === "listening" && <ListeningQuiz onProgress={(val) => updateProgress("listening", val)} />}
        {view === "shadowing" && <Shadowing />}
        {view === "builder" && <SentenceBuilder />}
        {view === "quiz" && <Quiz />}
        {view === "mocktest" && <MockTest onProgress={(val) => updateProgress("mocktest", val)} />}
      </main>

      <footer style={{ 
        textAlign: "center", 
        padding: "30px", 
        color: THEME.colors.textLight || "#888", 
        fontSize: 13, 
        borderTop: "1px solid #eee",
        marginTop: '2rem'
      }}>
        日本語 N5 Journey · Built with 🌸 · がんばって！
      </footer>
    </div>
  );
}
