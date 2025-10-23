export default function Home() {
  return (
    <main>
      <h1>VaultXP</h1>
      <p>Connected to backend. API status:</p>
      <pre id="status">Checking...</pre>
      <p><a href="/offers">Go to Offers →</a></p>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            fetch('https://vaultxp-api.onrender.com/health')
              .then(r => r.json())
              .then(d => document.getElementById('status').textContent = JSON.stringify(d, null, 2))
              .catch(() => document.getElementById('status').textContent = 'API unreachable');
          `
        }}
      />
    </main>
  );
}
