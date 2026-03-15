/**
 * DROPZONE — Skin pool sort (by price).
 */

import { parsePriceFromCard } from './utils.js';

const POOL_CONTAINER_SEL = '#p-s-pool .skins-g';
const CARD_SEL = '.sk-c';

/** Toggle: true = high→low, false = low→high */
let sortDesc = true;

/**
 * Sort skin pool cards by price and re-append to container.
 */
export function sortSkinPool() {
  const container = document.querySelector(POOL_CONTAINER_SEL);
  if (!container) return;
  const cards = Array.from(container.querySelectorAll(CARD_SEL));
  sortDesc = !sortDesc;
  cards.sort((a, b) => {
    const pa = parsePriceFromCard(a);
    const pb = parsePriceFromCard(b);
    return sortDesc ? pb - pa : pa - pb;
  });
  cards.forEach((c) => container.appendChild(c));
}
