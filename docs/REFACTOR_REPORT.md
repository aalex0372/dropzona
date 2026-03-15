# DROPZONE — Refactor Report

## 1. Audit Summary

### Repo architecture (after refactor)

```
dropzona/
├── index.html              # SPA; loads js/main.js (module)
├── support.html
├── css/main.css
├── js/
│   ├── main.js             # Entry: wires modules, init, window.* for onclick
│   ├── constants.js        # STREAMS, TRIGGERS, USERS, SKINS, FOLLOWING_NAMES, PAGE_META
│   ├── config.js           # FEED_*_MAX, WIZARD_STEPS, DOM ids
│   ├── utils.js             # rnd, rndPrice, parsePriceFromCard, createEventId
│   ├── state.js             # dropCounter, feedCount, currentPageId, role, wizStep, simInterval
│   ├── dropPipeline.js      # runDropCycle (idempotent), wasEventProcessed, clearProcessedEvents
│   ├── feed.js              # addFeedEvent, addSFeedEvent
│   ├── router.js            # go, setRole
│   ├── stream.js            # buildTicker, buildStreams, buildFollowing, openStream
│   ├── wizard.js            # wizNext, wizPrev
│   ├── skinPool.js          # sortSkinPool
│   ├── app.js               # Legacy monolith (kept, not loaded; eslint ignored)
│   ├── *.test.js            # Vitest unit tests
│   └── ...
├── mobile/                  # Still uses mobile/js/app.js (duplicate logic) — deferred
├── docs/AUDIT.md
├── docs/REFACTOR_REPORT.md
├── vitest.config.js
├── eslint.config.js
└── package.json             # type: module, scripts: test, lint
```

- **Stack**: Static HTML/CSS/vanilla JS. No backend; critical path is simulated in the frontend.
- **Critical path**: One event id → one drop cycle (trigger → winner → trade sent → accept/expire). Idempotency enforced in `dropPipeline.js`.

### Biggest problems found

1. Single god file `app.js` mixing router, state, data, feed, stream, wizard, sim.
2. Desktop and mobile duplicate the same logic in two files (mobile not refactored in this pass).
3. No explicit drop pipeline; no idempotency by event id.
4. Global mutable state scattered; magic strings.
5. No tests; no lint.

### What was fixed now

- Extracted **constants**, **config**, **utils**, **state**, **dropPipeline**, **feed**, **router**, **stream**, **wizard**, **skinPool**; **main.js** entry wires them and exposes `go`, `setRole`, `openStream`, `wizNext`, `wizPrev`, `simulateTrigger`, `sortSkinPool` on `window` for HTML `onclick`.
- **Idempotency**: `runDropCycle(eventId, ...)` records `eventId` in a Set; second call with same `eventId` returns `null` and does not run again.
- **Drop pipeline**: Clear stages with callbacks (`onTrigger`, `onWinner`, `onTradeSent`, `onTradeResolved`); `createEventId()` for sim; when a real backend exists, replace the sim with API calls using the same callbacks.
- **Vitest**: 19 tests for `utils`, `state`, `dropPipeline` (idempotency, timers, getters/setters).
- **ESLint**: Flat config, ESM globals, `js/app.js` ignored (legacy).

### What was deferred

- Mobile app still uses `mobile/js/app.js` (duplicate of old monolith). Share `js/*` modules from mobile entry later.
- Full TypeScript or Zod at boundaries.
- Replacing inline `onclick` with a single delegate.
- Backend, DB, Redis, real event ingestion, real trade API.

---

## 2. Refactor Changes

| File / folder | Change |
|---------------|--------|
| `js/constants.js` | **New.** Streams, triggers, users, skins, following names, PAGE_META. |
| `js/config.js` | **New.** Feed max lengths, wizard steps, DOM ids. |
| `js/utils.js` | **New.** rnd, rndPrice, parsePriceFromCard, createEventId. |
| `js/state.js` | **New.** Single state object + getters/setters. |
| `js/dropPipeline.js` | **New.** runDropCycle (idempotent), wasEventProcessed, clearProcessedEvents. |
| `js/feed.js` | **New.** addFeedEvent, addSFeedEvent using state and config. |
| `js/router.js` | **New.** go, setRole using state and PAGE_META. |
| `js/stream.js` | **New.** buildTicker, buildStreams, buildFollowing, openStream. |
| `js/wizard.js` | **New.** wizNext, wizPrev using state and config. |
| `js/skinPool.js` | **New.** sortSkinPool using utils.parsePriceFromCard. |
| `js/main.js` | **New.** Imports all, simulateTrigger via runDropCycle + callbacks, startSim, init, window.*. |
| `index.html` | **Changed.** Script src from `js/app.js` to `js/main.js` with `type="module"`. |
| `js/app.js` | **Unchanged.** Kept as legacy; not loaded; eslint ignored. |
| `docs/AUDIT.md` | **New.** Architecture and top 10 issues. |
| `vitest.config.js` | **New.** Node env, include **/*.test.js. |
| `eslint.config.js` | **New.** ESM, globals, ignores app.js. |
| `package.json` | **Changed.** type: module, scripts test + lint, devDependencies vitest + eslint. |

**Logic simplified**

- `simulateTrigger()` is a thin wrapper: create event id → `runDropCycle(eventId, data, callbacks)`; all timing and stages live in `dropPipeline.js`.
- Feed and streamer feed updates go through callbacks, so the pipeline stays UI-agnostic.

**Critical-path improvements**

- One `eventId` → one drop; duplicate `eventId` returns `null` and does not call callbacks again.
- Explicit stages: trigger → winner → trade sent → trade resolved (accept/expire).

---

## 3. Reliability Improvements

- **Idempotency**: `processedEventIds` Set in `dropPipeline.js`; `runDropCycle(eventId, ...)` returns `null` if `eventId` was already processed.
- **Error handling**: No new swallowed exceptions; pipeline and feed are synchronous except for simulated delays (setTimeout).
- **Async / queue**: N/A (no backend queue); simulated delays are in one place (`dropPipeline.js`) with clear callbacks.
- **Logging**: No new logging added; when backend exists, add a single `dropId`/`eventId` in logs for tracing.

---

## 4. Test Results

- **Test command**: `npm run test` (Vitest run).
- **Lint**: `npm run lint` (ESLint on `js/`, app.js ignored).
- **Typecheck**: None (no TypeScript).
- **Build**: None (static site; Vercel has no buildCommand).

**Results**

- **Lint**: Pass (0 errors).
- **Tests**: 19 passed (3 files: state.test.js, utils.test.js, dropPipeline.test.js).
- **Tests added**: 19 (utils: 9, dropPipeline: 6, state: 4).

**Gaps**

- No integration tests (no backend).
- No DOM/UI tests (feed, router, stream use document; could add later with happy-dom).
- Mobile `app.js` not covered by new structure.

---

## 5. Remaining Risks

1. **Mobile out of sync**: `mobile/js/app.js` is still the old monolith; any fix in desktop modules must be duplicated or mobile switched to shared `js/` modules.
2. **No real critical path**: Event ingestion, rules, winner selection, reservation, trade send/track are all simulated; first backend integration will need to plug into `dropPipeline` callbacks and enforce idempotency server-side.
3. **Legacy app.js**: Left in repo but not loaded; could be removed or archived to avoid confusion.
4. **No typecheck**: JSDoc only; refactors could break contracts without a typecheck step.
5. **Vercel**: `buildCommand: null`; if you add a build later, ensure `npm run test` and `npm run lint` run in CI.

---

## 6. Next Best Steps

1. **Wire mobile to shared modules**: Add `mobile/main.js` that imports from `../js/` and bind mobile-only UI (bottom nav, drawer); remove duplicate `mobile/js/app.js` once verified.
2. **Backend spike**: When ready, add an event ingestion endpoint and call `runDropCycle` (or equivalent) with a server-generated `eventId` and persist drop state; keep the same callback shape for UI updates (e.g. over WebSocket).
3. **Add typecheck**: Enable `checkJs` and/or migrate to TypeScript for `js/*.js` (or add a small TS layer for boundaries only).
4. **CI**: Run `npm run lint` and `npm run test` on push/PR.
5. **Remove or archive `js/app.js`**: After confirming desktop and (if done) mobile work with the new entry, delete or move `app.js` out of the lint set and document the cutover.
