export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getOffers() {
  try {
    const res = await fetch('https://vaultxp-api.onrender.com/offers', { cache: 'no-store' });
    if (!res.ok) return { offers: [] };
    return res.json();
  } catch (err) {
    console.error("Failed to load offers:", err);
    return { offers: [] };
  }
}

export default async function OffersPage() {
  const { offers } = await getOffers();

  return (
    <main style={{ padding: 20 }}>
      <h1>Offers</h1>
      {offers.length === 0 ? (
        <p>No offers available at the moment.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 12 }}>
          {offers.map((offer) => (
            <li key={offer.id} style={{ border: '1px solid #ddd', padding: 15, borderRadius: 8 }}>
              <h3>{offer.title}</h3>
              <p>
                Device: {offer.device} • Provider: {offer.provider}
              </p>
              <p>Reward: ${(offer.payout_cents / 100).toFixed(2)}</p>
              <a href="#">Start</a>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
