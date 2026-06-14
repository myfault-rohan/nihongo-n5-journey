import React, { useState } from "react";
import { darkTheme } from "../styles/theme";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // We'll use the dark theme for the login screen for a premium lacquerware feel
  const currentTheme = darkTheme;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await res.json();
      if (data.success) {
        onLogin(data.token);
      } else {
        setError("Incorrect username or password. This is a private journey.");
      }
    } catch (err) {
      setError("Could not connect to the server. Is the backend running?");
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: currentTheme.colors.background,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      fontFamily: currentTheme.fonts.main,
    }}>
      <div className="fade-up" style={{
        background: currentTheme.colors.cardBg,
        padding: "48px 40px",
        borderRadius: 24,
        boxShadow: currentTheme.shadows.floating,
        width: "100%",
        maxWidth: 420,
        textAlign: "center",
        border: `1px solid ${currentTheme.colors.border}`,
      }}>
        {/* Logo */}
        <div style={{ marginBottom: 32 }}>
          <div style={{
            background: currentTheme.colors.primary,
            color: "#fff",
            width: 64, height: 64,
            borderRadius: 16,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 32, fontWeight: 900, fontFamily: currentTheme.fonts.japanese,
            margin: "0 auto 16px",
            boxShadow: "0 8px 24px rgba(231, 76, 60, 0.4)",
          }}>
            日
          </div>
          <h1 style={{ 
            fontSize: 28, fontWeight: 900, color: currentTheme.colors.secondary, margin: "0 0 4px",
            letterSpacing: 1
          }}>
            Nihongo Journey
          </h1>
          <p style={{ color: currentTheme.colors.textLight, fontSize: 14, margin: 0 }}>
            Your personal path to JLPT N5 mastery
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {error && (
            <div style={{
              background: "rgba(231, 76, 60, 0.1)",
              color: currentTheme.colors.primary,
              padding: 12, borderRadius: 8, fontSize: 13, fontWeight: 600
            }}>
              {error}
            </div>
          )}

          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: "100%", padding: "14px 16px",
                background: currentTheme.colors.gray,
                border: `1.5px solid ${currentTheme.colors.border}`,
                borderRadius: 12, fontSize: 15, color: currentTheme.colors.secondary,
                outline: "none", boxSizing: "border-box",
                transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.target.style.borderColor = currentTheme.colors.primary}
              onBlur={(e) => e.target.style.borderColor = currentTheme.colors.border}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%", padding: "14px 16px",
                background: currentTheme.colors.gray,
                border: `1.5px solid ${currentTheme.colors.border}`,
                borderRadius: 12, fontSize: 15, color: currentTheme.colors.secondary,
                outline: "none", boxSizing: "border-box",
                transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.target.style.borderColor = currentTheme.colors.primary}
              onBlur={(e) => e.target.style.borderColor = currentTheme.colors.border}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "16px",
              background: currentTheme.colors.primary,
              color: "#fff",
              border: "none",
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 800,
              cursor: loading ? "wait" : "pointer",
              boxShadow: "0 4px 12px rgba(231, 76, 60, 0.3)",
              transition: "all 0.2s ease",
              marginTop: 8,
              opacity: loading ? 0.8 : 1
            }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.transform = "translateY(0)")}
          >
            {loading ? "Authenticating..." : "Begin Journey"}
          </button>
        </form>
      </div>
    </div>
  );
}
