/**
 * DROPZONE — Stream list, following chips, stream detail.
 */

import { STREAMS, TRIGGERS, FOLLOWING_NAMES, USERS, SKINS } from './constants.js';
import { rnd } from './utils.js';
import { go } from './router.js';

/**
 * Build the ticker strip (fake “who won” scroll).
 */
export function buildTicker() {
  const items = [];
  for (let i = 0; i < 10; i++) {
    const skin = rnd(SKINS);
    items.push(`<span class="ticker-i"><b>${rnd(USERS)}</b> won <span class="sk-r sk-${skin.rarity}">${skin.name}</span></span><span class="ticker-sep">·</span>`);
  }
  const el = document.getElementById('tickerContent');
  if (el) {
    el.innerHTML = items.join('') + items.join('');
    // Force animation to start after content is in DOM (fixes no-scroll on reload)
    el.style.animation = 'none';
    el.offsetHeight; // reflow
    el.style.animation = '';
  }
}

/** Live streams only (for grid and chip status) */
function getLiveStreams() {
  return STREAMS.filter((s) => s.live !== false);
}

/** Offline streams (for carousel “back” / right side) */
const FOLLOWING_CHIPS_MAX = 7;

/** Build following chips: up to 7 streamers, then "View all" if user follows more. */
export function buildFollowing() {
  const el = document.getElementById('followingList');
  if (!el) return;
  const liveNames = new Set(getLiveStreams().map((s) => s.name));
  const toShow = FOLLOWING_NAMES.slice(0, FOLLOWING_CHIPS_MAX)
    .sort((a, b) => (liveNames.has(a) === liveNames.has(b) ? 0 : liveNames.has(a) ? -1 : 1));
  const hasMore = FOLLOWING_NAMES.length > FOLLOWING_CHIPS_MAX;
  const chips = toShow.map((name) => {
    const stream = STREAMS.find((s) => s.name === name);
    const isLive = liveNames.has(name);
    const id = stream ? stream.id : null;
    const dataId = id ? ` data-stream-id="${id}"` : '';
    return `<span class="following-chip ${isLive ? 'live' : ''}"${dataId}>${name} ${isLive ? '<span class="chip-dot"></span><span class="chip-status">LIVE</span>' : '<span class="chip-status">Offline</span>'}</span>`;
  });
  if (hasMore) {
    chips.push(`<span class="following-chip following-chip--viewall" onclick="go('followings')">View all</span>`);
  }
  el.innerHTML = chips.join('');
  el.querySelectorAll('.following-chip.live[data-stream-id]').forEach((chip) => {
    chip.addEventListener('click', () => openStream(parseInt(chip.dataset.streamId, 10)));
  });
}

/**
 * Build Followings page: list of streamers the user follows + open stream on click.
 */
export function buildFollowingsPage() {
  const el = document.getElementById('followingsList');
  if (!el) return;
  const liveNames = new Set(getLiveStreams().map((s) => s.name));
  el.innerHTML = FOLLOWING_NAMES.map((name) => {
    const stream = STREAMS.find((s) => s.name === name);
    const isLive = liveNames.has(name);
    const id = stream ? stream.id : null;
    const dataId = id ? ` data-stream-id="${id}"` : '';
    const game = stream ? stream.game : '';
    const ava = stream ? stream.ava : name.slice(0, 2).toUpperCase();
    return `
    <div class="fl-row"${dataId}>
      <div class="str-ava">${ava}</div>
      <div class="fl-info">
        <div class="str-name">${name}</div>
        ${game ? `<div class="str-game">${game}</div>` : ''}
      </div>
      <span class="fl-status ${isLive ? 'on' : 'off'}">${isLive ? 'LIVE' : 'Offline'}</span>
    </div>`;
  }).join('');
  el.querySelectorAll('.fl-row[data-stream-id]').forEach((row) => {
    row.addEventListener('click', () => openStream(parseInt(row.dataset.streamId, 10)));
  });
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

/**
 * Build one stream card HTML (live only). Replaces trigger icons with Follow/Following.
 */
function streamCardHtml(s) {
  const isFollowing = FOLLOWING_NAMES.includes(s.name);
  const followLabel = isFollowing ? 'Following' : 'Follow';
  const followClass = isFollowing ? 'str-follow-btn str-follow-btn--following' : 'str-follow-btn';
  return `<div class="str-c" data-stream-id="${s.id}">
    <div class="str-prev"><div class="gv"><i data-lucide="gamepad-2" style="width:80px;height:80px;stroke-width:1"></i></div>
      <div class="str-br"><div class="b-live"><span class="dot"></span> LIVE</div><div class="b-view"><i data-lucide="eye" class="lc-sm"></i> ${s.viewers.toLocaleString()}</div></div>
      <div class="str-pool"><i data-lucide="gift" class="lc-sm"></i> ${s.pool} skins · $${s.poolVal}</div>
    </div>
    <div class="str-meta">
      <div class="str-ava">${s.ava}</div>
      <div style="flex:1"><div class="str-name">${s.name}</div><div class="str-game">${s.game}</div></div>
      <button type="button" class="${followClass}" data-stream-id="${s.id}" data-following="${isFollowing}" onclick="event.stopPropagation()">${followLabel}</button>
    </div>
  </div>`;
}

/**
 * Build stream grid: online (live) streamers only; duplicated for infinite scroll both ways.
 */
export function buildStreams() {
  const el = document.getElementById('streamGrid');
  const scrollEl = el?.closest('.str-grid-scroll');
  if (!el || !scrollEl) return;
  const liveStreams = getLiveStreams();
  const cardsHtml = liveStreams.map((s) => streamCardHtml(s)).join('');
  el.innerHTML = cardsHtml + cardsHtml;
  if (typeof lucide !== 'undefined') lucide.createIcons();
  el.querySelectorAll('.str-c').forEach((card) => {
    card.addEventListener('click', () => openStream(parseInt(card.dataset.streamId, 10)));
  });

  let ticking = false;
  function loopScroll() {
    const oneSet = el.scrollWidth / 2;
    let left = scrollEl.scrollLeft;
    if (oneSet <= 0) return;
    if (left >= oneSet) scrollEl.scrollLeft = left - oneSet;
    else if (left <= 0) scrollEl.scrollLeft = left + oneSet;
  }
  scrollEl.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { loopScroll(); ticking = false; });
  });
  requestAnimationFrame(() => {
    scrollEl.scrollLeft = 0;
  });

  buildFollowing();
}

/**
 * Open stream detail and navigate to stream page.
 * @param {number} id - Stream id
 */
export function openStream(id) {
  const s = STREAMS.find((x) => x.id === id);
  if (!s) return;
  const sdAva = document.getElementById('sdAva');
  const sdName = document.getElementById('sdName');
  const sdGame = document.getElementById('sdGame');
  const sdViewers = document.getElementById('sdViewers');
  const sdPool = document.getElementById('sdPool');
  const sdTriggers = document.getElementById('sdTriggers');
  if (sdAva) sdAva.textContent = s.ava;
  if (sdName) sdName.textContent = s.name;
  if (sdGame) sdGame.textContent = s.game;
  if (sdViewers) sdViewers.textContent = s.viewers.toLocaleString();
  if (sdPool) sdPool.innerHTML = `<i data-lucide="gift" class="lc-sm"></i> ${s.pool} skins · $${s.poolVal}`;
  if (sdTriggers) {
    sdTriggers.innerHTML = s.triggers.map((t) => {
      const tr = TRIGGERS.find((x) => x.ico === t);
      return `<div class="trig-r"><div class="trig-ico" style="background:var(--rd-s);color:var(--rd)"><i data-lucide="${t}" class="lc"></i></div><div class="trig-info"><div class="trig-n">${tr ? tr.n : t}</div></div><span class="st st-on">Active</span></div>`;
    }).join('');
  }
  go('stream');
  if (typeof lucide !== 'undefined') lucide.createIcons();
}
