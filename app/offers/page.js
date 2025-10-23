"use client";
import { useEffect, useState } from "react";

const API = "https://vaultxp-api.onrender.com";

export default function OffersPage() {
  const [offers, setOffers] = useState([]);
  const [busyId, setBusyId] = useState(null);
  const [message, setMessage] = useState("");

  async function loadOffers() {
    try {
      const res = await fetch(`${API}/offers`, { cache: "no-store" });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setOffers(data.offers || []);
    } catch {
      setOffers([]);
    }
  }

  async function startOffer(id) {
    try {
      setBusyId(id);
      setMessage("");
      const res = await fetch(`${API}/offers/${id}/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setMessage(`✅ Credited: +$${(data.credited.amount_cents / 100).toFixed(2)} — "${data.credited.source}"`);
      } else {
        setMessage("❌ Failed to start offer");
      }
    } catch (e) {
      setMessage("❌ Network error");
    } finally {
      setBusyId(null);
    }
  }

  useEffect(() => {
    loadOffers();
  }, []);

  return (
    <main style={{ padding: 20 }}>
      <h1>Offers</h1>

      {message && (
        <p style={{ margin: "10px 0", padding: "8px 10px", background: "#eef7ff", border: "1px solid #b6dcff", borderRadius: 6 }}>
          {message} — <a href="/wallet">View Wallet →</a>
        </p>
      )}

      {offers.length === 0 ? (
        <p>No offers available at the moment.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 12 }}>
          {offers.map((offer) => (
            <li key={offer.id} style={{ border: "1px solid #ddd", padding: 15, borderRadius: 8 }}>
              <h3 style={{ margin: 0 }}>{offer.title}</h3>
              <p style={{ margin: "6px 0", fontSize: 14, opacity: 0.8 }}>
                Device: {offer.device} • Provider: {offer.provider}
              </p>
              <p style={{ margin: "6px 0", fontWeight: 600 }}>
                Reward: ${(offer.payout_cents / 100).toFixed(2)}
              </p>
              <button
                onClick={() => startOffer(offer.id)}
                disabled={busyId === offer.id}
                style={{
                  padding: "8px 12px",
                  borderRadius: 6,
                  border: "1px solid #6b21a8",
                  background: busyId === offer.id ? "#f3e8ff" : "#fff",
                  color: "#6b21a8",
                  cursor: "pointer"
                }}
              >
                {busyId === offer.id ? "Starting…" : "Start"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
