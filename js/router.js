/**
 * DROPZONE — Router and role switcher.
 */

import { setCurrentPageId, setRole as setStateRole } from './state.js';
import { PAGE_META } from './constants.js';

/**
 * Navigate to a page by id.
 * @param {string} pageId - Page id (e.g. 'browse', 's-dash')
 */
export function go(pageId) {
  setCurrentPageId(pageId);
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
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

/**
 * Set viewer vs streamer role and update nav/UI.
 * @param {'v'|'s'} r
 */
export function setRole(r) {
  setStateRole(r);
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
  if (typeof lucide !== 'undefined') lucide.createIcons();
}
