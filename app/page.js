"use client";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [status, setStatus] = useState("Checking...");
  const [lastChecked, setLastChecked] = useState(null);

  async function checkAPI() {
    const timestamp = new Date();
    const formattedTime = timestamp.toLocaleTimeString();
    console.log(`[VaultXP] ${formattedTime} - Checking API...`);

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
    }

    // Update the visible timestamp
    setLastChecked(formattedTime);
  }

  useEffect(() => {
    checkAPI();
    // retry once in case Render backend is still waking
    const retry = setTimeout(checkAPI, 4000);
    return () => clearTimeout(retry);
  }, []);

  return (
    <main style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>VaultXP</h1>
      <p>Connected to backend. API status:</p>
      <strong style={{ fontSize: "1.2em" }}>{status}</strong>

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
    </main>
  );
}
