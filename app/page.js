"use client";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [status, setStatus] = useState("Checking...");
  const [lastChecked, setLastChecked] = useState(null);
  const [loading, setLoading] = useState(false);
  const [justUpdated, setJustUpdated] = useState(false);

  async function checkAPI(manual = false) {
    const timestamp = new Date();
    const formattedTime = timestamp.toLocaleTimeString();
    console.log(`[VaultXP] ${formattedTime} - Checking API...`);

    setLoading(true);
    try {
      const res = await fetch("https://vaultxp-api.onrender.com/health");
      const data = await res.json();
      console.log(`[VaultXP] ${formattedTime} - API Response:`, data);

      if (data.ok) {
        setStatus("Reachable ✅");
        console.log(`[VaultXP] ${formattedTime} - ✅ API Reachable`);
      } else {
        setStatus("Offline ❌");
        console.warn(`[VaultXP] ${formattedTime} - ⚠️ API Offline`);
      }
    } catch (err) {
      setStatus("Unreachable ❌");
      console.error(`[VaultXP] ${formattedTime} - ❌ API Unreachable`, err);
    } finally {
      setLastChecked(formattedTime);
      setLoading(false);
      if (manual) console.log(`[VaultXP] ${formattedTime} - 🔄 Manual refresh triggered`);

      // show transient "Updated ✓"
      setJustUpdated(true);
      setTimeout(() => setJustUpdated(false), 1500);
    }
  }

  useEffect(() => {
    // Initial check + one retry (handles Render cold start)
    checkAPI();
    const retry = setTimeout(checkAPI, 4000);

    // Background check every 60s
    const interval = setInterval(() => checkAPI(false), 60000);

    return () => {
      clearTimeout(retry);
      clearInterval(interval);
    };
  }, []);

  return (
    <main style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>VaultXP</h1>
      <p>Connected to backend. API status:</p>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <strong style={{ fontSize: "1.2em" }}>{status}</strong>
        <button
          onClick={() => checkAPI(true)}
          disabled={loading}
          title="Refresh API status"
          style={{
            border: "none",
            background: "none",
            fontSize: "1.4em",
            cursor: "pointer",
            color: loading ? "#999" : "#6b21a8",
            animation: loading ? "spin 1s linear infinite" : "none",
          }}
        >
          ↻
        </button>
        {justUpdated && (
          <span className="updatedBadge">Updated ✓</span>
        )}
      </div>

      {lastChecked && (
        <p style={{ marginTop: 10, color: "#555" }}>
          <em>Last checked at {lastChecked}</em>
        </p>
      )}

      <div style={{ marginTop: 20 }}>
        <a href="/offers" style={{ color: "purple" }}>
          Go to Offers →
        </a>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeOutUp {
          0%   { opacity: 0; transform: translateY(4px); }
          10%  { opacity: 1; transform: translateY(0); }
          70%  { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-4px); }
        }
        .updatedBadge {
          font-size: 0.9em;
          color: #065f46;          /* teal-ish */
          background: #d1fae5;     /* light emerald */
          border: 1px solid #6ee7b7;
          border-radius: 999px;
          padding: 2px 8px;
          animation: fadeOutUp 1.2s ease forwards;
        }
      `}</style>
    </main>
  );
}
