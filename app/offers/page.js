async function getOffers() {
  const res = await fetch('https://vaultxp-api.onrender.com/offers', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load offers');
  return res.json();
}

export default async function OffersPage() {
  const { offers } = await getOffers();

  return (
    <main>
      <h1>Offers</h1>
      <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 12 }}>
        {offers.map(o => (
          <li key={o.id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
            <div style={{ fontWeight: 600 }}>{o.title}</div>
            <div style={{ fontSize: 14, opacity: 0.7 }}>
              Device: {o.device} • Provider: {o.provider}
            </div>
            <div style={{ marginTop: 6, fontWeight: 600 }}>
              Reward: ${(o.payout_cents / 100).toFixed(2)}
            </div>
            <a href={`#start-${o.id}`} style={{ marginTop: 8, display: 'inline-block' }}>
              Start
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
