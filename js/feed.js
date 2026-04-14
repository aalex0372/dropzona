/**
 * DROPZONE — Feed UI: viewer and streamer event feeds.
 */

import { incrementFeedCount, getFeedCount } from './state.js';
import { FEED_LIST_ID, S_FEED_LIST_ID, FEED_COUNT_ID, FEED_VIEWER_MAX, FEED_STREAMER_MAX } from './config.js';


function getFeedCountDisplay() {
  return getFeedCount() + ' today';
}

/** @typedef {'kill'|'drop'|'trade'|'join'|'fail'} FeedEventType */
const VALID_FEED_TYPES = new Set(['kill', 'drop', 'trade', 'join', 'fail']);

/**
 * Append a row to the viewer event feed.
 * @param {FeedEventType} type - CSS class for dot (fd.kill, fd.drop, etc.)
 * @param {string} msg - Pre-sanitized HTML message (callers must escape user data)
 */
export function addFeedEvent(type, msg) {
  incrementFeedCount();
  const el = document.getElementById(FEED_LIST_ID);
  if (!el) return;
  const safeType = VALID_FEED_TYPES.has(type) ? type : 'kill';
  const row = document.createElement('div');
  row.className = 'feed-r';
  row.style.animation = 'pageIn .3s ease';
  row.innerHTML = `<div class="fd ${safeType}"></div><div class="fm">${msg}</div><div class="ft">now</div>`;
  el.insertBefore(row, el.firstChild);
  while (el.children.length > FEED_VIEWER_MAX) el.removeChild(el.lastChild);
  const countEl = document.getElementById(FEED_COUNT_ID);
  if (countEl) countEl.textContent = getFeedCountDisplay();
}

/**
 * Append a row to the streamer event feed.
 * @param {FeedEventType} type
 * @param {string} msg - Pre-sanitized HTML message (callers must escape user data)
 */
export function addSFeedEvent(type, msg) {
  const el = document.getElementById(S_FEED_LIST_ID);
  if (!el) return;
  const safeType = VALID_FEED_TYPES.has(type) ? type : 'kill';
  const row = document.createElement('div');
  row.className = 'feed-r';
  row.style.animation = 'pageIn .3s ease';
  row.innerHTML = `<div class="fd ${safeType}"></div><div class="fm">${msg}</div><div class="ft">now</div>`;
  el.insertBefore(row, el.firstChild);
  while (el.children.length > FEED_STREAMER_MAX) el.removeChild(el.lastChild);
}
