/**
 * DROPZONE — Router. Path-based with History API.
 *
 * URL structure:
 *   /app/browse, /app/followings, /app/stream, /app/my-drops, /app/profile
 *   /app/s/dashboard, /app/s/wallet, /app/s/triggers, /app/s/pool,
 *   /app/s/history, /app/s/health, /app/s/profile, /app/s/onboard
 *
 * Bare /app (or /app/) defaults to the user's role landing page.
 */

import { setCurrentPageId, setRole as setStateRole, getRole } from './state.js';
import { PAGE_META } from './constants.js';
import { refreshIcons } from './utils.js';

/** pageId → URL path (no trailing slash) */
const PAGE_TO_PATH = {
  'browse': '/app/browse',
  'followings': '/app/followings',
  'stream': '/app/stream',
  'my-drops': '/app/my-drops',
  'profile': '/app/profile',
  's-dash': '/app/s/dashboard',
  's-wallet': '/app/s/wallet',
  's-triggers': '/app/s/triggers',
  's-hist': '/app/s/history',
  's-health': '/app/s/health',
  's-profile': '/app/s/profile',
  's-onboard': '/app/s/onboard',
};

/** URL path → pageId (built once from PAGE_TO_PATH) */
const PATH_TO_PAGE = Object.fromEntries(
  Object.entries(PAGE_TO_PATH).map(([id, path]) => [path, id])
);

/**
 * Resolve a pageId to its public URL path.
 * @param {string} pageId
 * @returns {string}
 */
export function pageIdToPath(pageId) {
  return PAGE_TO_PATH[pageId] || '/app/' + pageId;
}

/**
 * Resolve a URL path to a pageId (or null if unknown).
 * Trailing slashes are tolerated.
 * @param {string} pathname
 * @returns {string|null}
 */
function pathToPageId(pathname) {
  const p = pathname.replace(/\/+$/, '') || '/';
  return PATH_TO_PAGE[p] || null;
}

/** Suppress popstate→go loop while we're updating history ourselves */
let _suppressPopstate = false;

/**
 * Navigate to a page by id. Pushes a real URL into history.
 * @param {string} pageId - Page id (e.g. 'browse', 's-dash')
 */
export function go(pageId) {
  if (!PAGE_META[pageId]) return;
  setCurrentPageId(pageId);

  const newPath = pageIdToPath(pageId);
  if (window.location.pathname !== newPath) {
    _suppressPopstate = true;
    try {
      window.history.pushState({ pageId }, '', newPath);
    } catch {
      window.location.pathname = newPath;
    }
    _suppressPopstate = false;
  }

  document.dispatchEvent(new window.CustomEvent('dropzona:page-change', { detail: { pageId } }));
  document.querySelectorAll('.page').forEach((x) => x.classList.remove('act'));
  const pageEl = document.getElementById('p-' + pageId);
  if (pageEl) pageEl.classList.add('act');
  document.querySelectorAll('.ni').forEach((n) => n.classList.remove('act'));
  const ni = document.querySelector('.ni[data-p="' + pageId + '"]');
  if (ni) ni.classList.add('act');
  const meta = PAGE_META[pageId];
  const pgT = document.getElementById('pgT');
  const pgS = document.getElementById('pgS');
  if (meta && pgT) pgT.textContent = meta[0];
  if (meta && pgS) pgS.textContent = meta[1];
  refreshIcons();
}

/**
 * Set viewer vs streamer role and update nav/UI.
 * @param {'v'|'s'} r
 */
export function setRole(r) {
  setStateRole(r);
  localStorage.setItem('dropzona_role', r);
  const roleSl = document.getElementById('roleSl');
  if (roleSl) roleSl.classList.toggle('str', r === 's');
  const rBtnV = document.getElementById('rBtnV');
  const rBtnS = document.getElementById('rBtnS');
  if (rBtnV) rBtnV.classList.toggle('active', r === 'v');
  if (rBtnS) rBtnS.classList.toggle('active', r === 's');
  const navV = document.getElementById('navV');
  const navS = document.getElementById('navS');
  if (navV) navV.style.display = r === 'v' ? 'block' : 'none';
  if (navS) navS.style.display = r === 's' ? 'block' : 'none';
  const uRole = document.getElementById('uRole');
  if (uRole) uRole.textContent = r === 'v' ? 'Viewer' : 'Streamer';
  const topAct = document.getElementById('topAct');
  if (topAct) {
    if (r === 's') {
      topAct.innerHTML = '<i data-lucide="radio" class="lc-sm"></i> Go Live';
      topAct.onclick = null;
    } else {
      topAct.innerHTML = '<i data-lucide="radio" class="lc-sm"></i> Become Streamer';
      topAct.onclick = () => setRole('s');
    }
  }
  go(r === 'v' ? 'browse' : 's-dash');
}

/**
 * Restore page from URL path on load, or navigate to role default.
 * Call once after DOM and UI are ready.
 */
export function restoreFromPath() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const pageId = pathToPageId(window.location.pathname);
  const role = getRole();
  const defaultPage = role === 's' ? 's-dash' : 'browse';

  if (pageId && PAGE_META[pageId]) {
    go(pageId);
  } else if (path === '/app') {
    // bare /app — land on the role default
    go(defaultPage);
  } else if (path.startsWith('/app/')) {
    // unknown app sub-path — show 404 instead of silently bouncing to /browse
    const from = encodeURIComponent(window.location.pathname + window.location.search);
    window.location.replace('/404.html?from=' + from);
    return;
  } else {
    go(defaultPage);
  }

  window.addEventListener('popstate', () => {
    if (_suppressPopstate) return;
    const id = pathToPageId(window.location.pathname);
    if (id && PAGE_META[id]) {
      go(id);
    } else if (window.location.pathname.startsWith('/app/')) {
      const from = encodeURIComponent(window.location.pathname + window.location.search);
      window.location.replace('/404.html?from=' + from);
    }
  });
}
