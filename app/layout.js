import Script from "next/script";

export const metadata = {
  title: "VaultXP",
  description: "Play & earn hub",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
        {/* Header / Nav */}
        <header
          style={{
            padding: "12px 16px",
            borderBottom: "1px solid #eee",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <a href="/" style={{ fontWeight: 700, textDecoration: "none", color: "inherit" }}>
            VaultXP
          </a>
          <nav style={{ display: "flex", gap: 12 }}>
            <a href="/offers" style={{ textDecoration: "none", color: "#6b21a8" }}>Offers</a>
            <a href="/wallet" style={{ textDecoration: "none", color: "#6b21a8" }}>Wallet</a>
          </nav>
        </header>

        {/* Page content */}
        <div style={{ padding: 24 }}>{children}</div>

        {/* AdSense script — load once site-wide */}
        <Script
          id="adsense-script"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
