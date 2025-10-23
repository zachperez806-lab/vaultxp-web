"use client";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [status, setStatus] = useState("Checking...");

  async function checkAPI() {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[VaultXP] ${timestamp} - Checking API...`);

    try {
      const res = await fetch("https://vaultxp-api.onrender.com/health");
      const data = await res.json();
      console.log(`[VaultXP] ${timestamp} - API Response:`, data);

      if (data.ok) {
        setStatus("Reachable ✅");
        console.log(`[VaultXP] ${timestamp} - ✅ API Reachable`);
      } else {
        setStatus("Offline ❌");
        console.warn(`[VaultXP] ${timestamp} - ⚠️ API Offline`);
      }
    } catch (err) {
      setStatus("Unreachable ❌");
      console.error(`[VaultXP] ${timestamp} - ❌ API Unreachable`, err);
    }
  }

  useEffect(() => {
    checkAPI();
    const retry = setTimeout(checkAPI, 4000); // retry once if backend is waking up
    return () => clearTimeout(retry);
  }, []);

  return (
    <main style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>VaultXP</h1>
      <p>Connected to backend. API status:</p>
      <strong>{status}</strong>

      <div style={{ marginTop: 20 }}>
        <a href="/offers" style={{ color: "purple" }}>Go to Offers →</a>
      </div>
    </main>
  );
}
