// api/standings.js
// Vercel Serverless Function — proxies requests to the Riftbound API
// This runs on the SERVER, so CORS doesn't apply.

export default async function handler(req, res) {
  // Allow CORS from any origin so our frontend can call this
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { eventId, pageSize = '100' } = req.query;

  if (!eventId) {
    res.status(400).json({ error: 'Missing eventId parameter' });
    return;
  }

  const upstream =
    `https://api.cloudflare.riftbound.uvsgames.com/hydraproxy/api/v2/tournament-rounds/${eventId}/matches/paginated/?page=1&page_size=${pageSize}&avoid_cache=false`;

  try {
    const response = await fetch(upstream, {
      headers: {
        // Forward a normal browser-style User-Agent
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
      },
    });

    const body = await response.text();

    res.status(response.status)
      .setHeader('Content-Type', 'application/json')
      .end(body);
  } catch (err) {
    res.status(502).json({ error: 'Failed to fetch from Riftbound API', detail: err.message });
  }
}
