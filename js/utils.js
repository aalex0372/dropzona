/**
 * DROPZONE — Pure helpers (random pick, price, parse).
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
