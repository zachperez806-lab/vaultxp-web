export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getOffers() {
  try {
    const res = await fetch('https://vaultxp-api.onrender.com/offers', { cache: 'no-store' });
    if (!res.ok) return { offers: [] };
    return res.json();
  } catch {
    return { offers: [] };
  }
}

export default async function OffersPage() {
  const { offers } = await getOffers();
  ...
}
