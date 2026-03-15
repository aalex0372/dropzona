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
    requestAnimationFrame(() => {
      el.offsetHeight;
    });
  }
}

/**
 * Build following chips (depends on stream grid existing for live refs).
 */
export function buildFollowing() {
  const el = document.getElementById('followingList');
  if (!el) return;
  const liveNames = new Set(STREAMS.map((s) => s.name));
  el.innerHTML = FOLLOWING_NAMES.map((name) => {
    const stream = STREAMS.find((s) => s.name === name);
    const isLive = liveNames.has(name);
    const id = stream ? stream.id : null;
    const dataId = id ? ` data-stream-id="${id}"` : '';
    return `<span class="following-chip ${isLive ? 'live' : ''}"${dataId}>${name} ${isLive ? '<span class="chip-dot"></span><span class="chip-status">LIVE</span>' : '<span class="chip-status">Offline</span>'}</span>`;
  }).join('');
  el.querySelectorAll('.following-chip.live[data-stream-id]').forEach((chip) => {
    chip.addEventListener('click', () => openStream(parseInt(chip.dataset.streamId, 10)));
  });
}

/**
 * Build stream grid cards.
 */
export function buildStreams() {
  const el = document.getElementById('streamGrid');
  if (!el) return;
  el.innerHTML = STREAMS.map((s) => `
    <div class="str-c" data-stream-id="${s.id}">
      <div class="str-prev"><div class="gv"><i data-lucide="gamepad-2" style="width:80px;height:80px;stroke-width:1"></i></div>
        <div class="str-br"><div class="b-live"><span class="dot"></span> LIVE</div><div class="b-view"><i data-lucide="eye" class="lc-sm"></i> ${s.viewers.toLocaleString()}</div></div>
        <div class="str-pool"><i data-lucide="gift" class="lc-sm"></i> ${s.pool} skins · $${s.poolVal}</div>
      </div>
      <div class="str-meta">
        <div class="str-ava">${s.ava}</div>
        <div style="flex:1"><div class="str-name">${s.name}</div><div class="str-game">${s.game}</div></div>
        <div class="str-triggers">${s.triggers.map((t) => `<div class="tr-mini"><i data-lucide="${t}" class="lc-sm"></i></div>`).join('')}</div>
      </div>
    </div>`).join('');
  if (typeof lucide !== 'undefined') lucide.createIcons();
  el.querySelectorAll('.str-c').forEach((card) => {
    card.addEventListener('click', () => openStream(parseInt(card.dataset.streamId, 10)));
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
