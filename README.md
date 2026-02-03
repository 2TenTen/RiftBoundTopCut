# Riftbound Top Cut Calculator

## Why this structure?

The Riftbound API (`api.cloudflare.riftbound.uvsgames.com`) does **not** send
`Access-Control-Allow-Origin` headers, so a browser will block any `fetch()`
from a different origin.  The fix is a one-file serverless **proxy** that runs
on the server — the browser talks to *your* Vercel URL, and Vercel talks to
Riftbound.

```
Browser  ──fetch──>  Vercel /api/standings  ──fetch──>  Riftbound API
         <──json───                          <──json───
```

## Files

| File                | Purpose                                          |
|---------------------|--------------------------------------------------|
| `index.html`        | The full app (single page, no build step)        |
| `api/standings.js`  | Vercel Serverless Function — the CORS proxy      |
| `vercel.json`       | Minimal Vercel config                            |

## Deploy (takes ~2 minutes)

1. **Create a free Vercel account** → https://vercel.com/signup
2. **Push these files to a GitHub repo** (or use Vercel's "Upload" flow):
   - You can literally just drag the folder into GitHub's web UI to create a
     repo if you don't use git locally.
3. **Go to** https://vercel.com/new
4. **Import** that GitHub repo — pick it from the list.
5. Vercel auto-detects the structure.  Click **Deploy**.  (Leave all defaults.)
6. You're done.  Vercel gives you a URL like `https://your-project.vercel.app`

That's it.  Open the URL, paste an event ID, hit **Fetch Standings**.

## Local testing (optional)

If you have `npx` / Node ≥ 18:

```bash
npx vercel dev
```

Then open http://localhost:3000 — the proxy and the page both work locally.

## Tweaking

* **Top-cut size / rounds** are inputs on the page — no code change needed.
* If the Riftbound API field names ever change, look at the browser console
  (`First match object: …` log) and update the field mappings in the
  `parsePlayers()` function in `index.html`.
