/**
 * DROPZONE — AppSkeleton.
 *
 * Route-dispatched skeleton for the SPA shell in app.html. The sidebar +
 * topbar live outside the swap region and stay visible; this module only
 * paints what would sit inside the `.main > .page` slot.
 *
 * Page id ↔ URL mapping mirrors js/router.js (PAGE_TO_PATH). Unknown pageIds
 * fall back to a generic dashboard-shaped skeleton.
 *
 * Public API:
 *   resolvePageIdFromPath(pathname) – pure helper for the loader bootstrap
 *   mountAppSkeleton(pageId?)       – defaults to current URL path
 *   unmountAppSkeleton()            – remove skeleton + clear html[data-loading]
 */

import { createSkeleton, createSkeletonParagraph } from './Skeleton.js';

const HOST_ID = 'app-skeleton';

const PATH_TO_PAGE = {
  '/app/browse':      'browse',
  '/app/followings':  'followings',
  '/app/stream':      'stream',
  '/app/my-drops':    'my-drops',
  '/app/profile':     'profile',
  '/app/s/dashboard': 's-dash',
  '/app/s/wallet':    's-wallet',
  '/app/s/triggers':  's-triggers',
  '/app/s/history':   's-hist',
  '/app/s/health':    's-health',
  '/app/s/profile':   's-profile',
  '/app/s/onboard':   's-onboard',
};

/**
 * Resolve a URL pathname to a pageId. Returns null for unknown paths.
 * @param {string} pathname
 * @returns {string|null}
 */
export function resolvePageIdFromPath(pathname) {
  if (!pathname) return null;
  const p = pathname.replace(/\/+$/, '') || '/';
  if (PATH_TO_PAGE[p]) return PATH_TO_PAGE[p];
  if (p === '/app') {
    // Bare /app — match router's role-default logic loosely.
    try {
      const role = localStorage.getItem('dropzona_role');
      return role === 's' ? 's-dash' : 'browse';
    } catch {
      return 'browse';
    }
  }
  return null;
}

/* ─────────────────────────────────────────────────────────────────────────
   DOM helpers
   ───────────────────────────────────────────────────────────────────────── */

function h(tag, className, children) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (children) {
    const arr = Array.isArray(children) ? children : [children];
    for (const c of arr) if (c != null) el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  }
  return el;
}

/* ─────────────────────────────────────────────────────────────────────────
   Shared atoms
   ───────────────────────────────────────────────────────────────────────── */

/** Single stat tile (icon + value + label + optional delta). */
function statTile(opts = {}) {
  const { delta = false } = opts;
  return h('div', 'dz-sk-app__stat', [
    createSkeleton({ variant: 'block', w: '2.4rem', h: '2.4rem', r: 10 }),
    h('div', 'dz-sk-app__stat-body', [
      createSkeleton({ variant: 'text', w: '60%', h: '1.4rem', r: 6 }),
      createSkeleton({ variant: 'text', w: '85%', h: '0.75rem', r: 4 }),
      delta ? createSkeleton({ variant: 'pill', w: '3rem', h: '0.9rem', r: 999 }) : null,
    ]),
  ]);
}

/** Row of N stat tiles. */
function statsRow(n, opts = {}) {
  const row = h('div', `dz-sk-app__stats dz-sk-app__stats--${n}`);
  for (let i = 0; i < n; i++) row.appendChild(statTile(opts));
  return row;
}

/** Generic card with header + content slot. */
function card(headerWidth, ...content) {
  return h('div', 'dz-sk-app__card', [
    h('div', 'dz-sk-app__card-head', [
      createSkeleton({ variant: 'block', w: '1.1rem', h: '1.1rem', r: 4 }),
      createSkeleton({ variant: 'text', w: headerWidth || '12rem', h: '0.95rem', r: 6 }),
    ]),
    ...content,
  ]);
}

/** Table-like row skeleton with N column widths (percent strings). */
function tableRow(widths) {
  return h('div', 'dz-sk-app__t-row',
    widths.map(w => createSkeleton({ variant: 'text', w, h: '0.85rem', r: 6 })),
  );
}

function tableBlock(widths, rows = 6) {
  const wrap = h('div', 'dz-sk-app__t-wrap');
  // header
  wrap.appendChild(h('div', 'dz-sk-app__t-head',
    widths.map(w => createSkeleton({ variant: 'text', w, h: '0.7rem', r: 4 })),
  ));
  for (let i = 0; i < rows; i++) wrap.appendChild(tableRow(widths));
  return wrap;
}

/** Streamer card for the browse grid. */
function streamCard() {
  return h('div', 'dz-sk-app__stream-card', [
    createSkeleton({ variant: 'image', w: '100%', h: '8.5rem', r: 12 }),
    h('div', 'dz-sk-app__stream-meta', [
      createSkeleton({ variant: 'circle', w: '2rem', h: '2rem' }),
      h('div', 'dz-sk-app__stream-meta-text', [
        createSkeleton({ variant: 'text', w: '70%', h: '0.85rem', r: 4 }),
        createSkeleton({ variant: 'text', w: '90%', h: '0.7rem', r: 4 }),
      ]),
      createSkeleton({ variant: 'pill', w: '3rem', h: '1.2rem', r: 999 }),
    ]),
  ]);
}

/** Connection row (e.g., Twitch / Steam linking). */
function connectionRow() {
  return h('div', 'dz-sk-app__conn-row', [
    createSkeleton({ variant: 'block', w: '2.5rem', h: '2.5rem', r: 10 }),
    h('div', 'dz-sk-app__conn-copy', [
      createSkeleton({ variant: 'text', w: '8rem', h: '0.95rem', r: 6 }),
      createSkeleton({ variant: 'text', w: '14rem', h: '0.75rem', r: 4 }),
    ]),
    createSkeleton({ variant: 'pill', w: '5.5rem', h: '2rem', r: 10 }),
  ]);
}

/** Game-mode chip strip (CS2 / Dota 2 / etc.). */
function gameChips(n = 3) {
  const row = h('div', 'dz-sk-app__chips');
  for (let i = 0; i < n; i++) {
    row.appendChild(createSkeleton({ variant: 'pill', w: '6rem', h: '2.2rem', r: 10 }));
  }
  return row;
}

/** Trigger row: icon + name/description + range slider + toggle. */
function triggerRow() {
  return h('div', 'dz-sk-app__trig-row', [
    createSkeleton({ variant: 'block', w: '2.5rem', h: '2.5rem', r: 10 }),
    h('div', 'dz-sk-app__trig-info', [
      createSkeleton({ variant: 'text', w: '60%', h: '0.95rem', r: 6 }),
      createSkeleton({ variant: 'text', w: '85%', h: '0.75rem', r: 4 }),
    ]),
    h('div', 'dz-sk-app__trig-range', [
      createSkeleton({ variant: 'text', w: '3.5rem', h: '0.75rem', r: 4 }),
      createSkeleton({ variant: 'block', w: '7rem', h: '0.5rem', r: 999 }),
    ]),
    createSkeleton({ variant: 'pill', w: '2.6rem', h: '1.4rem', r: 999 }),
  ]);
}

/** Onboarding wizard step (number + label). */
function wizardStep(active = false) {
  return h('div', `dz-sk-app__wiz-step${active ? ' is-active' : ''}`, [
    createSkeleton({ variant: 'circle', w: '1.8rem', h: '1.8rem' }),
    createSkeleton({ variant: 'text', w: '5rem', h: '0.8rem', r: 4 }),
  ]);
}

/** Health-row: dot + name/desc + status pill. */
function healthRow() {
  return h('div', 'dz-sk-app__health-row', [
    createSkeleton({ variant: 'circle', w: '0.65rem', h: '0.65rem' }),
    h('div', 'dz-sk-app__health-info', [
      createSkeleton({ variant: 'text', w: '50%', h: '0.95rem', r: 6 }),
      createSkeleton({ variant: 'text', w: '80%', h: '0.75rem', r: 4 }),
    ]),
    createSkeleton({ variant: 'pill', w: '4rem', h: '1.4rem', r: 999 }),
  ]);
}

/* ─────────────────────────────────────────────────────────────────────────
   Per-page skeletons
   ───────────────────────────────────────────────────────────────────────── */

/** Ticker (drops scroll) shared by browse / dashboard intros. */
function ticker() {
  return h('div', 'dz-sk-app__ticker', [
    createSkeleton({ variant: 'pill', w: '4.5rem', h: '1.5rem', r: 999 }),
    createSkeleton({ variant: 'text', w: '80%', h: '0.85rem', r: 4 }),
  ]);
}

function browseSkeleton() {
  return h('div', 'dz-sk-app__page', [
    ticker(),
    statsRow(4),
    h('div', 'dz-sk-app__row-between', [
      createSkeleton({ variant: 'text', w: '8rem', h: '1.1rem', r: 6 }),
      createSkeleton({ variant: 'block', w: '11rem', h: '2.1rem', r: 10 }),
    ]),
    h('div', 'dz-sk-app__stream-grid',
      Array.from({ length: 6 }, () => streamCard()),
    ),
    card('10rem',
      h('div', 'dz-sk-app__feed',
        Array.from({ length: 5 }, () =>
          h('div', 'dz-sk-app__feed-row', [
            createSkeleton({ variant: 'circle', w: '1.6rem', h: '1.6rem' }),
            createSkeleton({ variant: 'text', w: '70%', h: '0.85rem', r: 4 }),
            createSkeleton({ variant: 'text', w: '3rem', h: '0.75rem', r: 4 }),
          ]),
        ),
      ),
    ),
  ]);
}

function followingsSkeleton() {
  return h('div', 'dz-sk-app__page', [
    h('div', 'dz-sk-app__page-head', [
      createSkeleton({ variant: 'text', w: '12rem', h: '1.6rem', r: 6 }),
      createSkeletonParagraph({ lines: 1, lineHeight: '0.85rem', widths: [55] }),
    ]),
    createSkeleton({ variant: 'block', w: '100%', h: '2.5rem', r: 10 }),
    h('div', 'dz-sk-app__list',
      Array.from({ length: 6 }, () =>
        h('div', 'dz-sk-app__list-row', [
          createSkeleton({ variant: 'circle', w: '2.5rem', h: '2.5rem' }),
          h('div', 'dz-sk-app__list-text', [
            createSkeleton({ variant: 'text', w: '40%', h: '0.95rem', r: 6 }),
            createSkeleton({ variant: 'text', w: '60%', h: '0.75rem', r: 4 }),
          ]),
          createSkeleton({ variant: 'pill', w: '4rem', h: '1.5rem', r: 999 }),
          createSkeleton({ variant: 'pill', w: '5rem', h: '2rem', r: 10 }),
        ]),
      ),
    ),
  ]);
}

function streamSkeleton() {
  return h('div', 'dz-sk-app__page', [
    h('div', 'dz-sk-app__stream-layout', [
      // Player + meta column
      h('div', 'dz-sk-app__stream-main', [
        createSkeleton({ variant: 'image', w: '100%', h: '24rem', r: 14 }),
        h('div', 'dz-sk-app__stream-info', [
          createSkeleton({ variant: 'circle', w: '3rem', h: '3rem' }),
          h('div', 'dz-sk-app__stream-info-text', [
            createSkeleton({ variant: 'text', w: '40%', h: '1.2rem', r: 6 }),
            createSkeleton({ variant: 'text', w: '70%', h: '0.8rem', r: 4 }),
          ]),
          createSkeleton({ variant: 'pill', w: '6rem', h: '2.2rem', r: 10 }),
        ]),
        card('10rem',
          h('div', 'dz-sk-app__feed',
            Array.from({ length: 4 }, () =>
              h('div', 'dz-sk-app__feed-row', [
                createSkeleton({ variant: 'circle', w: '1.5rem', h: '1.5rem' }),
                createSkeleton({ variant: 'text', w: '70%', h: '0.85rem', r: 4 }),
                createSkeleton({ variant: 'text', w: '3rem', h: '0.75rem', r: 4 }),
              ]),
            ),
          ),
        ),
      ]),
      // Chat column
      h('div', 'dz-sk-app__stream-side', [
        card('6rem',
          h('div', 'dz-sk-app__chat',
            Array.from({ length: 8 }, (_, i) =>
              h('div', 'dz-sk-app__chat-row', [
                createSkeleton({ variant: 'text', w: '5rem', h: '0.75rem', r: 4 }),
                createSkeleton({ variant: 'text', w: `${55 + (i * 7) % 35}%`, h: '0.75rem', r: 4 }),
              ]),
            ),
          ),
        ),
      ]),
    ]),
  ]);
}

function myDropsSkeleton() {
  return h('div', 'dz-sk-app__page', [
    h('div', 'dz-sk-app__page-head', [
      createSkeleton({ variant: 'text', w: '10rem', h: '1.6rem', r: 6 }),
      createSkeletonParagraph({ lines: 1, lineHeight: '0.85rem', widths: [50] }),
    ]),
    statsRow(4),
    card('10rem', tableBlock(['18%', '24%', '14%', '14%', '14%', '12%'], 6)),
  ]);
}

function profileSkeleton() {
  return h('div', 'dz-sk-app__page', [
    statsRow(4),
    card('14rem',
      h('div', 'dz-sk-app__conn-list', [connectionRow(), connectionRow()]),
    ),
  ]);
}

function sProfileSkeleton() {
  // Streamer profile has a similar stats + connections layout.
  return profileSkeleton();
}

function sOnboardSkeleton() {
  return h('div', 'dz-sk-app__page', [
    h('div', 'dz-sk-app__wiz-steps', [
      wizardStep(true), wizardStep(), wizardStep(), wizardStep(), wizardStep(),
    ]),
    card('14rem',
      h('div', 'dz-sk-app__wiz-body', [
        createSkeleton({ variant: 'text', w: '60%', h: '1.4rem', r: 6 }),
        createSkeletonParagraph({ lines: 3, lineHeight: '0.85rem', widths: [95, 88, 60] }),
        h('div', 'dz-sk-app__wiz-actions', [
          createSkeleton({ variant: 'pill', w: '10rem', h: '2.5rem', r: 10 }),
          createSkeleton({ variant: 'pill', w: '8rem', h: '2.5rem', r: 10, className: 'dz-sk--ghost' }),
        ]),
      ]),
    ),
  ]);
}

function sDashSkeleton() {
  return h('div', 'dz-sk-app__page', [
    h('div', 'dz-sk-app__page-head', [
      createSkeleton({ variant: 'text', w: '12rem', h: '1.6rem', r: 6 }),
      createSkeleton({ variant: 'pill', w: '8rem', h: '2.1rem', r: 10 }),
    ]),
    statsRow(4, { delta: true }),
    h('div', 'dz-sk-app__g21', [
      card('12rem',
        h('div', 'dz-sk-app__chart', [
          createSkeleton({ variant: 'block', w: '100%', h: '11rem', r: 10 }),
          h('div', 'dz-sk-app__chart-legend',
            Array.from({ length: 3 }, () =>
              createSkeleton({ variant: 'text', w: '4.5rem', h: '0.75rem', r: 4 }),
            ),
          ),
        ]),
      ),
      card('10rem',
        h('div', 'dz-sk-app__list',
          Array.from({ length: 4 }, () =>
            h('div', 'dz-sk-app__list-row', [
              createSkeleton({ variant: 'circle', w: '2rem', h: '2rem' }),
              h('div', 'dz-sk-app__list-text', [
                createSkeleton({ variant: 'text', w: '60%', h: '0.85rem', r: 4 }),
                createSkeleton({ variant: 'text', w: '40%', h: '0.7rem', r: 4 }),
              ]),
              createSkeleton({ variant: 'pill', w: '3.5rem', h: '1.4rem', r: 999 }),
            ]),
          ),
        ),
      ),
    ]),
  ]);
}

function sWalletSkeleton() {
  return h('div', 'dz-sk-app__page', [
    statsRow(4, { delta: true }),
    card('10rem',
      h('div', 'dz-sk-app__wallet-deposit', [
        h('div', 'dz-sk-app__form-row', [
          createSkeleton({ variant: 'text', w: '5rem', h: '0.75rem', r: 4 }),
          createSkeleton({ variant: 'block', w: '100%', h: '2.5rem', r: 10 }),
        ]),
        gameChips(3),
        h('div', 'dz-sk-app__form-row', [
          createSkeleton({ variant: 'text', w: '6rem', h: '0.75rem', r: 4 }),
          createSkeleton({ variant: 'block', w: '100%', h: '2.5rem', r: 10 }),
        ]),
        h('div', 'dz-sk-app__wiz-actions', [
          createSkeleton({ variant: 'pill', w: '11rem', h: '2.5rem', r: 10 }),
        ]),
      ]),
    ),
    card('10rem', tableBlock(['22%', '20%', '20%', '18%', '20%'], 5)),
  ]);
}

function sTriggersSkeleton() {
  return h('div', 'dz-sk-app__page', [
    gameChips(4),
    card('12rem',
      h('div', 'dz-sk-app__trig-grid',
        Array.from({ length: 6 }, () => triggerRow()),
      ),
    ),
  ]);
}

function sHistSkeleton() {
  return h('div', 'dz-sk-app__page', [
    statsRow(4),
    h('div', 'dz-sk-app__row-between', [
      gameChips(3),
      createSkeleton({ variant: 'pill', w: '8rem', h: '2rem', r: 10 }),
    ]),
    card('10rem', tableBlock(['18%', '22%', '20%', '14%', '14%', '12%'], 8)),
  ]);
}

function sHealthSkeleton() {
  return h('div', 'dz-sk-app__page', [
    statsRow(3),
    h('div', 'dz-sk-app__g2', [
      card('10rem',
        h('div', 'dz-sk-app__health-list',
          Array.from({ length: 5 }, () => healthRow()),
        ),
      ),
      card('10rem',
        h('div', 'dz-sk-app__health-list',
          Array.from({ length: 5 }, () => healthRow()),
        ),
      ),
    ]),
  ]);
}

const BUILDERS = {
  'browse':     browseSkeleton,
  'followings': followingsSkeleton,
  'stream':     streamSkeleton,
  'my-drops':   myDropsSkeleton,
  'profile':    profileSkeleton,
  's-profile':  sProfileSkeleton,
  's-onboard':  sOnboardSkeleton,
  's-dash':     sDashSkeleton,
  's-wallet':   sWalletSkeleton,
  's-triggers': sTriggersSkeleton,
  's-hist':     sHistSkeleton,
  's-health':   sHealthSkeleton,
};

function resolveHost() {
  return document.getElementById(HOST_ID);
}

/**
 * Mount the appropriate page skeleton into #app-skeleton.
 * If pageId is omitted, resolves from window.location.pathname.
 *
 * @param {string} [pageId]
 */
export function mountAppSkeleton(pageId) {
  const root = resolveHost();
  if (!root || root.dataset.mounted === '1') return;
  const id = pageId || resolvePageIdFromPath(window.location.pathname) || 's-dash';
  const build = BUILDERS[id] || sDashSkeleton;
  root.setAttribute('role', 'status');
  root.setAttribute('aria-busy', 'true');
  root.setAttribute('aria-label', 'Loading');
  root.dataset.pageId = id;
  root.replaceChildren(build());
  root.dataset.mounted = '1';
}

/** Remove the skeleton and clear the global loading flag. */
export function unmountAppSkeleton() {
  const root = resolveHost();
  if (root) {
    root.setAttribute('aria-busy', 'false');
    root.classList.add('dz-sk-host--leaving');
    root.replaceChildren();
    root.dataset.mounted = '0';
    const detach = () => root.remove();
    root.addEventListener('transitionend', detach, { once: true });
    setTimeout(detach, 500);
  }
  document.documentElement.dataset.loading = 'false';
}
