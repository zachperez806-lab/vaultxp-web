async function getWallet() {
  const res = await fetch('https://vaultxp-api.onrender.com/wallet', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load wallet');
  return res.json();
}

export default async function WalletPage() {
  const wallet = await getWallet();

  return (
    <main>
      <h1>Wallet</h1>
      <p><strong>Balance:</strong> ${(wallet.balance_cents / 100).toFixed(2)}</p>

      <h3>Recent Earnings</h3>
      <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 8 }}>
        {wallet.earnings.map(e => (
          <li key={e.id} style={{ border: '1px solid #eee', padding: 10, borderRadius: 6 }}>
            <div><strong>{e.source}</strong></div>
            <div>+${(e.amount_cents / 100).toFixed(2)} on {e.date}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
