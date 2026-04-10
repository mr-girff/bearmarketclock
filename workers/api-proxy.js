/**
 * Cloudflare Worker — BearMarketClock API Proxy
 * Caches CoinGecko + Fear&Greed responses in KV to avoid rate limits
 */

const COINGECKO_BASE = "https://api.coingecko.com/api/v3";
const FEAR_GREED_URL = "https://api.alternative.me/fng/";
const CACHE_TTL = 5 * 60;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

async function cachedFetch(env, key, url, ttl = CACHE_TTL) {
  const cached = await env.BEAR_KV.get(key);
  if (cached) return JSON.parse(cached);
  const res = await fetch(url, { headers: { "Accept": "application/json" }, cf: { cacheTtl: ttl } });
  const data = await res.json();
  await env.BEAR_KV.put(key, JSON.stringify(data), { expirationTtl: ttl });
  return data;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") return new Response(null, { headers: CORS });
    try {
      if (url.pathname === "/api/bitcoin") {
        const data = await cachedFetch(env, "bitcoin_data", `${COINGECKO_BASE}/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`);
        return new Response(JSON.stringify(data), { headers: CORS });
      }
      if (url.pathname === "/api/fear-greed") {
        const data = await cachedFetch(env, "fear_greed", FEAR_GREED_URL, 60 * 60);
        return new Response(JSON.stringify(data), { headers: CORS });
      }
      if (url.pathname === "/api/subscribe" && request.method === "POST") {
        const body = await request.text();
        const { email } = JSON.parse(body);
        if (!email || !email.includes("@")) return new Response(JSON.stringify({ error: "Invalid email" }), { status: 400, headers: CORS });
        await env.BEAR_KV.put(`sub_${email}`, JSON.stringify({ email, subscribedAt: new Date().toISOString() }));
        return new Response(JSON.stringify({ ok: true }), { headers: CORS });
      }
      return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: CORS });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: CORS });
    }
  },
};
