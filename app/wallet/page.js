"use client";
import { useEffect, useState } from "react";

const API = "https://vaultxp-api.onrender.com";

export default function WalletPage() {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadWallet() {
    try {
      const res = await fetch(`${API}/wallet`, { cache: "no-store" });
      const data = await res.json();
      setWallet(data);
    } catch {
      setWallet(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWallet();
  }, []);

  if (loading) return <main style={{ padding: 20 }}><h1>Wallet</h1><p>Loading…</p></main>;
  if (!wallet) return <main style={{ padding: 20 }}><h1>Wallet</h1><p>Temporarily unavailable.</p></main>;

  return (
    <main style={{ padding: 20 }}>
      <h1>Wallet</h1>
      <p><strong>Balance:</strong> ${(wallet.balance_cents / 100).toFixed(2)}</p>

      <h3>Recent Earnings</h3>
      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 8 }}>
        {wallet.earnings.map(e => (
          <li key={e.id} style={{ border: "1px solid #eee", padding: 10, borderRadius: 6 }}>
            <div><strong>{e.source}</strong></div>
            <div>+${(e.amount_cents / 100).toFixed(2)} on {e.date}</div>
          </li>
        ))}
      </ul>
      <p style={{ marginTop: 12 }}><a href="/offers">Back to Offers →</a></p>
    </main>
  );
}
