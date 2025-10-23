"use client";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [status, setStatus] = useState("Checking...");

  async function checkAPI() {
    try {
      const res = await fetch("https://vaultxp-api.onrender.com/health");
      const data = await res.json();
      if (data.ok) {
        setStatus("Reachable ✅");
      } else {
        setStatus("Offline ❌");
      }
    } catch (err) {
      setStatus("Unreachable ❌");
    }
  }

  useEffect(() => {
    checkAPI();
    const retry = setTimeout(checkAPI, 4000); // retry once in 4s if backend was cold
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
