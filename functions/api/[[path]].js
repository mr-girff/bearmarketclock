// functions/api/[[path]].js
// Proxy all /api/* requests to the deployed Worker (avoids CORS issues from browser)

const WORKER_URL = "https://bearmarketclock-api.yuezemaoyi.workers.dev";

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const workerUrl = WORKER_URL + url.pathname + url.search;

  const req = new Request(workerUrl, {
    method: context.request.method,
    headers: context.request.headers,
    body: context.request.body,
  });

  return fetch(req);
}
