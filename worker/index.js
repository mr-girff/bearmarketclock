// Cloudflare Worker - BearMarketClock API Proxy
// Routes: /api/price  /api/fear  /api/subscribe

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=25' },
  });
}

async function handlePrice() {
  const url = 'https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false';
  const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
  if (!res.ok) return json({ error: 'upstream error' }, 502);
  const data = await res.json();
  const market = data.market_data;
  return json({
    price: market.current_price.usd,
    ath: market.ath.usd,
    ath_date: market.ath_date.usd,
    drawdown: ((market.current_price.usd - market.ath.usd) / market.ath.usd) * 100,
    market_cap: market.market_cap.usd,
    volume_24h: market.total_volume.usd,
    change_24h: market.price_change_percentage_24h,
    updated_at: new Date().toISOString(),
  });
}

async function handleFear() {
  const res = await fetch('https://api.alternative.me/fng/?limit=1');
  if (!res.ok) return json({ error: 'upstream error' }, 502);
  const data = await res.json();
  return json(data.data[0]);
}

async function handleSubscribe(request, env) {
  if (!env.EMAILS) return json({ error: 'KV not configured' }, 500);
  const body = await request.json().catch(() => ({}));
  const email = (body.email || '').trim().toLowerCase();
  if (!email || !email.includes('@')) return json({ error: 'Invalid email' }, 400);
  await env.EMAILS.put(email, JSON.stringify({ subscribed: new Date().toISOString() }));
  return json({ ok: true, message: 'Subscribed! You will be notified when a bear market starts or ends.' });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }

    if (path === '/api/price') return handlePrice();
    if (path === '/api/fear') return handleFear();
    if (path === '/api/subscribe' && request.method === 'POST') return handleSubscribe(request, env);

    return new Response('BearMarketClock Worker v1', { headers: CORS });
  },

  // Cron trigger: check bear market status daily and email subscribers
  async scheduled(event, env, ctx) {
    if (!env.EMAILS) return;
    const priceRes = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false');
    const priceData = await priceRes.json();
    const price = priceData.market_data.current_price.usd;
    const ath = priceData.market_data.ath.usd;
    const drawdown = ((price - ath) / ath) * 100;
    const isBear = drawdown <= -20;

    // Store latest status in KV
    await env.EMAILS.put('__status__', JSON.stringify({ price, ath, drawdown, isBear, updatedAt: new Date().toISOString() }));

    // TODO: Trigger email alerts via Mailgun/SendGrid when status changes
    // const prevStatus = await env.EMAILS.get('__prev_status__', { type: 'json' });
    // if (prevStatus && prevStatus.isBear !== isBear) { ... send emails ... }
  },
};
