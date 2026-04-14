/**
 * DROPZONE — Pure helpers (random pick, price, parse, sanitize, icons).
 */

/**
 * Pick a random element from an array.
 * @template T
 * @param {T[]} arr
 * @returns {T}
 */
export function rnd(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Random price string in range (for sim).
 * @returns {string}
 */
export function rndPrice() {
  return (Math.random() * 50 + 3).toFixed(2);
}

/**
 * Parse numeric price from a skin card element (e.g. .sk-p).
 * Used by skin pool sort. Returns 0 if not found or invalid.
 * @param {Element} cardEl - Card containing .sk-p
 * @returns {number}
 */
export function parsePriceFromCard(cardEl) {
  const p = cardEl.querySelector('.sk-p');
  if (!p) return 0;
  const n = parseFloat((p.textContent || '').replace(/[^0-9.]/g, ''));
  return Number.isNaN(n) ? 0 : n;
}

/**
 * Generate a unique event id for simulated drops (idempotency key).
 * @returns {string}
 */
export function createEventId() {
  return `sim_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
}

/* ---- HTML sanitization ---- */

const ESC_MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/**
 * Escape HTML special characters to prevent XSS.
 * @param {string} str
 * @returns {string}
 */
export function esc(str) {
  return String(str).replace(/[&<>"']/g, (ch) => ESC_MAP[ch]);
}

/**
 * Wrap raw text in <b> (escaped).
 * @param {string} raw
 * @returns {string}
 */
export function bold(raw) {
  return `<b>${esc(raw)}</b>`;
}

/**
 * Skin name in highlighted span with optional rarity class (escaped).
 * @param {string} name
 * @param {string} [rarity]
 * @returns {string}
 */
export function skinHl(name, rarity) {
  const cls = rarity ? ` sk-${esc(rarity)}` : '';
  return `<span class="hl${cls}">${esc(name)}</span>`;
}

/**
 * Skin name for viewer "sk" style (escaped).
 * @param {string} name
 * @param {string} [rarity]
 * @returns {string}
 */
export function skinSk(name, rarity) {
  const cls = rarity ? ` sk-${esc(rarity)}` : '';
  return `<span class="sk${cls}">${esc(name)}</span>`;
}

/* ---- Debounced Lucide icon refresh ---- */

let _iconRafId = 0;

/**
 * Schedule a single lucide.createIcons() call on the next animation frame.
 * Multiple calls within the same frame are coalesced into one.
 */
export function refreshIcons() {
  if (_iconRafId) return;
  _iconRafId = requestAnimationFrame(() => {
    _iconRafId = 0;
    if (typeof lucide !== 'undefined') lucide.createIcons();
  });
}
