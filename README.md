# ArthaBot — Interactive Prototype

India's AI Financial Growth Companion — a working, clickable prototype built for the
**FINVERSE** capstone project (BITSOM × Masai, PM with Generative & Agentic AI program).

This is a front-end simulation of the ArthaBot experience: registration, a
Financial Health Score, scam checking, government scheme matching, goal
planning with real SIP math, an investment comparison tool, and a free
Google Sheets backend for persistence.

## 🚀 Try it live

Once this repo is on GitHub with Pages enabled (see below), the app is live at:

```
https://<your-username>.github.io/<repo-name>/arthabot-prototype.html
```

Anyone with that link can open and use the app — no installation needed.

## 📂 What's in this repo

| File | What it is |
|---|---|
| `arthabot-prototype.html` | The full app — a single self-contained HTML file. Open it directly in any browser, or host it (see below). |
| `arthabot-prototype.jsx` | The same app as a React component, for editing/iterating (e.g. in Claude, v0, or any React sandbox). |
| `google-apps-script.gs` | Optional free backend. Paste into a Google Sheet's Apps Script editor to persist user data (finances, goals, transaction history) to a spreadsheet. Setup steps are in the file's comments. |

## 🖥️ Run it locally

No build step required:

1. Download `arthabot-prototype.html`
2. Double-click it — it opens in your default browser
3. That's it. (First load needs internet, to fetch React/Tailwind from a CDN; after that it runs client-side.)

## 🌐 Host it for free with GitHub Pages (so others can use it)

1. Push/upload this repo to GitHub (steps below if you haven't yet).
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to `Deploy from a branch`.
4. Set **Branch** to `main` (or `master`) and folder to `/ (root)`. Click **Save**.
5. Wait ~1 minute, then refresh the Pages settings — GitHub will show your live URL:
   `https://<your-username>.github.io/<repo-name>/`
6. Share this exact link with anyone:
   `https://<your-username>.github.io/<repo-name>/arthabot-prototype.html`

No server, no cost, no login required for people you share it with.

## ☁️ Optional: connect the free Google Sheets backend

By default the app runs on local browser memory (data resets on refresh).
To make it persist across sessions and devices:

1. Follow the setup steps at the top of `google-apps-script.gs`.
2. Paste your deployed Web App URL into the `SHEETS_API_URL` constant near
   the top of `arthabot-prototype.html` (and `.jsx` if you're editing there).
3. Commit/push that change. Data now saves to your Google Sheet automatically.

## 👥 Giving others access

- **To just use the app:** share the GitHub Pages link above — works for anyone, no GitHub account needed.
- **To view/edit the code:** in your repo, go to **Settings → Collaborators**, click **Add people**, and enter their GitHub username or email. They'll get an invite email.
- **To let anyone view the code (not just use the app):** make sure the repo visibility is set to **Public** (Settings → General → Danger Zone → Change visibility).

## 🧩 Tech notes

Built with React (via CDN + Babel standalone), Tailwind CSS (via CDN), and
[lucide](https://lucide.dev) icons re-implemented as inline SVGs so the
single HTML file has zero install dependencies. Supports Hindi, Telugu, and
English throughout.

---
Part of the FINVERSE / ArthaBot capstone submission.
