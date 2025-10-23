"use client";

/**
 * Simple in-house ad component for VaultXP
 * - Use while waiting for AdSense approval
 * - Swap the link / copy to match your promos
 */
export default function HouseAd({
  headline = "🔥 New: $1.50 for installing GameX!",
  subtext = "Earn instant credit — limited time offer",
  href = "/offers",
}) {
  return (
    <a
      href={href}
      style={{
        display: "block",
        padding: 16,
        border: "1px solid #ddd",
        borderRadius: 8,
        background: "linear-gradient(180deg,#faf5ff,#ffffff)",
        textDecoration: "none",
        color: "#111",
        margin: "16px 0",
      }}
    >
      <strong style={{ display: "block", fontSize: 16 }}>{headline}</strong>
      <span style={{ fontSize: 14, opacity: 0.8 }}>{subtext}</span>
    </a>
  );
}
