# DROPZONE — Live Skin Drops

Watch CS2 streams, participate in drops, and win skins. A **static single-page app** with a dark theme, purple accents, and a clean layout. Includes a standalone support page, rarity-colored skin names (CS2-style), and modular JS with tests.

---

## Quick start

**Run locally**

```bash
npm install
npm start
```

Then open **http://localhost:3000**.

**Or** open `index.html` in a browser (or use Live Server). The app works with no build step.

---

## Project layout

```
dropzona/
├── index.html          # Main SPA (browse, stream, my-drops, profile, streamer pages)
├── support.html        # Standalone support page (FAQ, Discord, email/X/Instagram)
├── css/main.css        # Styles (variables, ticker, stats, feed, skins, rarity colors)
├── js/
│   ├── main.js         # Entry: init, go(), setRole(), buildTicker, buildStreams, sim
│   ├── router.js       # go(pageId), setRole(v|s)
│   ├── stream.js       # buildTicker, buildStreams, buildFollowing, openStream
│   ├── feed.js         # addFeedEvent, addSFeedEvent (viewer + streamer feeds)
│   ├── dropPipeline.js # runDropCycle (trigger → winner → trade), idempotent per event
│   ├── constants.js    # STREAMS, SKINS (name + rarity), USERS, TRIGGERS, PAGE_META
│   ├── state.js        # dropCounter, feedCount, currentPageId, role, simInterval
│   ├── config.js       # Feed list IDs, max items
│   ├── utils.js        # rnd, rndPrice, createEventId, parsePriceFromCard
│   ├── wizard.js       # wizNext, wizPrev
│   ├── skinPool.js     # sortSkinPool
│   └── *.test.js       # Vitest tests (dropPipeline, state, utils)
├── mobile/             # Mobile-friendly version (same flows, separate HTML/JS/CSS)
├── docs/               # AUDIT.md, REFACTOR_REPORT.md
├── package.json        # npm start, test, lint
├── vitest.config.js
├── eslint.config.js
├── robots.txt
└── sitemap.xml
```

---

## Features

- **Browse**: Stats (228 streams online, 12.4k drops, 3,722 viewers, $68.8k value), DROPS ticker, following chips, stream grid, event feed.
- **Skin rarity colors**: Ticker and event feed show skin names in CS2-style colors (Mil-Spec → Restricted → Classified → Covert → Extraordinary).
- **Viewer / Streamer roles**: Switch in sidebar; Viewer sees browse/my-drops, Streamer sees dashboard, triggers, pool, history, health.
- **Support page**: FAQ, Discord card (Open Discord / Send message), direct contact (Send email, Message on X, Message on Instagram).
- **Simulated drops**: Background sim runs trigger → winner → trade; feed updates with rarity-colored skin names.

---

## Pages (main SPA)

| Section       | ID           | Description                    |
|---------------|--------------|--------------------------------|
| Live Streams  | `p-browse`   | Stats, ticker, stream grid, event feed |
| Stream        | `p-stream`   | Single stream, eligibility     |
| My Drops      | `p-my-drops`| Won skins history              |
| Profile       | `p-profile` | Account, connections           |
| Viewer settings | `p-v-settings` | Notifications, account     |
| Dashboard     | `p-s-dash`  | Streamer feed, pool, triggers   |
| Triggers      | `p-s-triggers` | Game event config           |
| Skin Pool     | `p-s-pool`  | Drop pool                      |
| History       | `p-s-hist`  | Drops + state machine          |
| Health        | `p-s-health`| System status                  |
| Streamer settings | `p-s-settings` | API, bot, overlay          |

Navigation: `go(pageId)` in `router.js`. Role: `setRole('v'|'s')` toggles Viewer/Streamer nav and default page.

---

## Scripts

```bash
npm start     # Serve on port 3000
npm test      # Vitest (dropPipeline, state, utils)
npm run lint  # ESLint
```

---

## Design

- **Theme**: Dark background, purple/violet accent (`--ac`), JetBrains Mono + Outfit/Unbounded, subtle mesh and grain.
- **Rarity**: Skin names use `--r-milspec`, `--r-restricted`, `--r-classified`, `--r-covert`, `--r-gold` in ticker and feed.
- **Behavior**: Lucide icons, page transitions, scrolling DROPS ticker, event feed with colored skin names.

Edit `css/main.css` (especially `:root` and component classes) to tweak the look.
