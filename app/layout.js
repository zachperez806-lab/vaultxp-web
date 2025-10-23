export const metadata = { title: 'VaultXP', description: 'Play & earn hub' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        <header style={{
          padding: '12px 16px',
          borderBottom: '1px solid #eee',
          display: 'flex',
          gap: 16
        }}>
          <a href="/" style={{ fontWeight: 700, textDecoration: 'none' }}>VaultXP</a>
          <nav style={{ display: 'flex', gap: 12 }}>
            <a href="/offers">Offers</a>
            <a href="/wallet">Wallet</a>
          </nav>
        </header>
        <div style={{ padding: 24 }}>{children}</div>
      </body>
    </html>
  );
}
