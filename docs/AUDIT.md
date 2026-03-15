# DROPZONE — Refactor Audit (PRE-LAUNCH MVP)

## 1. Repo architecture summary

```
dropzona/
├── index.html          # Single-page app (all “pages” as sections)
├── support.html        # Standalone support page
├── css/main.css        # Design system + components
├── js/app.js           # Monolith: router, data, feed, stream, wizard, sim (~320 lines)
├── mobile/
│   ├── index.html      # Mobile layout (drawer + bottom nav)
│   ├── js/app.js       # ~90% duplicate of desktop app.js
│   └── css/mobile.css
├── package.json        # Optional: npx serve . -p 3000
├── vercel.json         # Static deploy (no build)
├── robots.txt, sitemap.xml
└── docs/AUDIT.md       # This file
```

- **Stack**: Static HTML/CSS/vanilla JS. No React, no Node backend, no DB, no Redis/BullMQ.
- **Critical path**: Game event → Trigger → Winner → Skin reserved → Trade sent → Trade accepted is **simulated only** in the frontend (`simulateTrigger()` with timeouts and random data). No real event ingestion, rules, or trade pipeline.

---

## 2. Top 10 code quality / architecture issues

| # | Issue | Category | Priority |
|---|--------|-----------|----------|
| 1 | Single god file `js/app.js` mixes router, state, data, feed, stream, wizard, sim, and DOM | Maintainability | **Must fix** |
| 2 | Desktop and mobile duplicate the same data and logic in two `app.js` files | Maintainability | **Must fix** |
| 3 | No explicit drop pipeline; one event can drive multiple UI updates without a single source of truth | Critical path risk | **Must fix** |
| 4 | No idempotency: repeated trigger with same logical “event” could be implied by sim (counter only increments) | Reliability risk | **Must fix** |
| 5 | Global mutable state (dropCounter, feedCount, role, curPage, wizStep, simInterval) with no single module | Maintainability | **Should fix** |
| 6 | Magic strings for page ids, feed types, and role codes everywhere | Maintainability | **Should fix** |
| 7 | No tests; no test framework | Reliability risk | **Must fix** |
| 8 | No shared types/JSDoc; no validation at boundaries | Reliability risk | **Should fix** |
| 9 | Inline `onclick` handlers and global `window.go` etc. required for HTML | Cosmetic | Defer |
| 10 | No lint or typecheck in repo | Maintainability | **Should fix** |

---

## 3. What we fix now vs defer

- **Fix now**: Modularize `app.js` into focused modules; extract drop pipeline with explicit stages and idempotency; centralize constants and state; add Vitest and high-value tests; add ESLint; make desktop and mobile share the same JS modules where possible.
- **Defer**: Full TypeScript migration, React/Next.js, backend/DB/Redis, real event ingestion and trade API, replacing inline handlers with a single event delegate.

---

## 4. Critical path (current)

Today the “critical path” is a **simulation** only:

1. `simulateTrigger()` picks random trigger, stream, user, skin, price.
2. Increments `dropCounter`, then uses `setTimeout` to append to viewer feed and streamer feed at different times (trigger → winner → trade sent → accept/expire).
3. No `event_id`; no dedup; no single state machine for one drop.

Refactor introduces:

- A **drop pipeline** module: one `eventId` → one drop cycle, with idempotency (processed event IDs remembered), and clear callbacks for trigger / winner / trade_sent / trade_resolved so the real backend can be plugged in later.
- Constants and config in one place so rules (e.g. feed max length) are explicit.
