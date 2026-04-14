/**
 * DROPZONE — Router (hash-based) and role switcher.
 */

import { setCurrentPageId, setRole as setStateRole, getRole } from './state.js';
import { PAGE_META } from './constants.js';
import { refreshIcons } from './utils.js';

/** Suppress hash→go loop while we're updating the hash ourselves */
let _suppressHashChange = false;

/**
 * Navigate to a page by id. Updates URL hash for deep linking.
 * @param {string} pageId - Page id (e.g. 'browse', 's-dash')
 */
export function go(pageId) {
  if (!PAGE_META[pageId]) return; // ignore unknown pages
  setCurrentPageId(pageId);

  // Update URL hash (without triggering hashchange→go loop)
  _suppressHashChange = true;
  window.location.hash = pageId;
  _suppressHashChange = false;

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
 * Restore page from URL hash on load, or navigate to default.
 * Call once after DOM and UI are ready.
 */
export function restoreFromHash() {
  const hash = window.location.hash.replace('#', '');
  const role = getRole();
  const defaultPage = role === 's' ? 's-dash' : 'browse';

  if (hash && PAGE_META[hash]) {
    go(hash);
  } else {
    go(defaultPage);
  }

  // Listen for browser back/forward
  window.addEventListener('hashchange', () => {
    if (_suppressHashChange) return;
    const h = window.location.hash.replace('#', '');
    if (h && PAGE_META[h]) go(h);
  });
}
