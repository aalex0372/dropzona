/**
 * DROPZONE — Stream list, following chips, stream detail.
 */

import { STREAMS, TRIGGERS, FOLLOWING_NAMES, USERS, SKINS, RECENT_DROPS_BY_STREAM } from './constants.js';
import { rnd } from './utils.js';
import { go } from './router.js';
import { getRole } from './state.js';

let streamActionsOutsideClickHandler = null;
let streamActionsRepositionHandler = null;

function wireStreamActions(s) {
  const shareMenuBtn = document.getElementById('sdShareMenuBtn');
  const reportBtn = document.getElementById('sdReportBtn');
  const actionsMenu = document.getElementById('sdActionsMenu');
  const shareFacebook = document.getElementById('sdShareFacebook');
  const shareX = document.getElementById('sdShareX');
  const shareTelegram = document.getElementById('sdShareTelegram');
  const shareWhatsApp = document.getElementById('sdShareWhatsApp');
  const copyAction = document.getElementById('sdCopyAction');
  const reportModal = document.getElementById('sdReportModal');
  const reportClose = document.getElementById('sdReportClose');
  const reportCancel = document.getElementById('sdReportCancel');
  const reportSubmit = document.getElementById('sdReportSubmit');
  const reportTopic = document.getElementById('sdReportTopic');
  const reportDetails = document.getElementById('sdReportDetails');
  if (!shareMenuBtn || !reportBtn || !actionsMenu || !copyAction) return;

  const profileUrl = `${window.location.origin}${window.location.pathname}#stream-${s.id}-${encodeURIComponent(s.name.toLowerCase())}`;
  const shareText = `Watch ${s.name} on DROPZONE`;

  const positionActionsMenu = () => {
    if (actionsMenu.style.display === 'none') return;
    const rect = shareMenuBtn.getBoundingClientRect();
    const menuWidth = 236;
    const gutter = 10;
    let left = rect.right - menuWidth;
    left = Math.max(gutter, Math.min(left, window.innerWidth - menuWidth - gutter));
    let top = rect.bottom + 8;
    const estimatedHeight = 220;
    if (top + estimatedHeight > window.innerHeight - gutter) {
      top = Math.max(gutter, rect.top - estimatedHeight - 8);
    }
    actionsMenu.style.left = `${left}px`;
    actionsMenu.style.top = `${top}px`;
  };

  if (shareFacebook) shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`;
  if (shareX) shareX.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(profileUrl)}`;
  if (shareTelegram) shareTelegram.href = `https://t.me/share/url?url=${encodeURIComponent(profileUrl)}&text=${encodeURIComponent(shareText)}`;
  if (shareWhatsApp) shareWhatsApp.href = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${profileUrl}`)}`;

  shareMenuBtn.onclick = (e) => {
    e.stopPropagation();
    const willOpen = actionsMenu.style.display === 'none';
    actionsMenu.style.display = willOpen ? 'flex' : 'none';
    if (willOpen) positionActionsMenu();
  };
  [shareFacebook, shareX, shareTelegram, shareWhatsApp].forEach((node) => {
    if (!node) return;
    node.onclick = () => { actionsMenu.style.display = 'none'; };
  });
  reportBtn.onclick = (e) => {
    e.stopPropagation();
    actionsMenu.style.display = 'none';
    if (reportModal) {
      reportModal.style.display = 'flex';
      if (reportTopic) reportTopic.value = 'suspicious-drops';
      if (reportDetails) reportDetails.value = '';
    }
  };
  copyAction.onclick = async (e) => {
    e.stopPropagation();
    actionsMenu.style.display = 'none';
    try {
      await window.navigator.clipboard.writeText(profileUrl);
      copyAction.innerHTML = '<i data-lucide="check" class="lc-sm"></i> Copied';
      if (typeof lucide !== 'undefined') lucide.createIcons();
      setTimeout(() => {
        copyAction.innerHTML = '<i data-lucide="copy" class="lc-sm"></i> Copy link';
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }, 1200);
    } catch {
      window.prompt('Copy streamer card link:', profileUrl);
    }
  };

  const closeReportModal = () => {
    if (reportModal) reportModal.style.display = 'none';
  };
  if (reportClose) reportClose.onclick = closeReportModal;
  if (reportCancel) reportCancel.onclick = closeReportModal;
  if (reportModal) {
    reportModal.onclick = (e) => {
      if (e.target === reportModal) closeReportModal();
    };
  }
  if (reportSubmit) {
    reportSubmit.onclick = () => {
      if (!reportTopic || !reportDetails) return;
      const details = reportDetails.value.trim();
      if (details.length < 8) {
        reportDetails.focus();
        return;
      }
      closeReportModal();
      window.alert(`Report submitted for ${s.name}. Thanks for helping keep DROPZONE safe.`);
    };
  }

  if (streamActionsOutsideClickHandler) {
    document.removeEventListener('click', streamActionsOutsideClickHandler);
  }
  streamActionsOutsideClickHandler = (ev) => {
    if (!actionsMenu.contains(ev.target) && !shareMenuBtn.contains(ev.target)) actionsMenu.style.display = 'none';
  };
  document.addEventListener('click', streamActionsOutsideClickHandler);

  if (streamActionsRepositionHandler) {
    window.removeEventListener('resize', streamActionsRepositionHandler);
    window.removeEventListener('scroll', streamActionsRepositionHandler, true);
  }
  streamActionsRepositionHandler = () => positionActionsMenu();
  window.addEventListener('resize', streamActionsRepositionHandler);
  window.addEventListener('scroll', streamActionsRepositionHandler, true);
}

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

function getViewerStreamFilterMode() {
  const sel = document.getElementById('viewerStreamFilter');
  return sel?.value || 'most-viewers';
}

function applyViewerStreamFilter(streams) {
  const mode = getViewerStreamFilterMode();
  const list = streams.slice();

  switch (mode) {
    case 'most-viewers':
      // Most viewers first
      list.sort((a, b) => (b.viewers ?? 0) - (a.viewers ?? 0));
      break;
    case 'fewest-viewers':
      list.sort((a, b) => (a.viewers ?? 0) - (b.viewers ?? 0));
      break;
    case 'most-drops':
      list.sort((a, b) => (b.totalDrops ?? 0) - (a.totalDrops ?? 0));
      break;
    case 'following-only':
      // Show only streamers that user follows (still only live streams).
      return list
        .filter((s) => FOLLOWING_NAMES.includes(s.name))
        .sort((a, b) => (b.viewers ?? 0) - (a.viewers ?? 0));
    default:
      // Fallback: Most viewers.
      list.sort((a, b) => (b.viewers ?? 0) - (a.viewers ?? 0));
  }

  return list;
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
  const searchInput = document.getElementById('followingsSearch');
  const liveNames = new Set(getLiveStreams().map((s) => s.name));

  const render = () => {
    const q = (searchInput?.value || '').trim().toLowerCase();
    const isSearch = q.length > 0;
    const list = isSearch
      ? STREAMS.filter((s) => s.name.toLowerCase().includes(q) || s.game.toLowerCase().includes(q))
      : FOLLOWING_NAMES.map((name) => STREAMS.find((s) => s.name === name)).filter(Boolean);

    if (list.length === 0) {
      el.innerHTML = '<div class="cd-p" style="font-size:13px;color:var(--t3)">No streamers found. Try another name or game.</div>';
      return;
    }

    el.innerHTML = list.map((stream) => {
      const isLive = liveNames.has(stream.name);
      const isFollowing = FOLLOWING_NAMES.includes(stream.name);
      const followNote = isSearch && !isFollowing ? '<div class="fl-note">Not followed yet</div>' : '';
      return `
      <div class="fl-row" data-stream-id="${stream.id}">
        <div class="str-ava">${stream.ava}</div>
        <div class="fl-info">
          <div class="str-name">${stream.name}</div>
          ${followNote}
        </div>
        <span class="fl-status ${isLive ? 'on' : 'off'}">${isLive ? 'LIVE' : 'Offline'}</span>
      </div>`;
    }).join('');

    el.querySelectorAll('.fl-row[data-stream-id]').forEach((row) => {
      row.addEventListener('click', () => openStream(parseInt(row.dataset.streamId, 10)));
    });
  };

  if (searchInput && !searchInput.dataset.bound) {
    searchInput.addEventListener('input', render);
    searchInput.dataset.bound = '1';
  }
  render();

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
      <div style="flex:1"><div class="str-name">${s.name}</div></div>
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
  const prevScrollLeft = scrollEl.scrollLeft || 0;
  const preserveScroll = scrollEl.dataset.viewerScrollInitialized === '1';

  const filterSel = document.getElementById('viewerStreamFilter');
  if (filterSel && !filterSel.dataset.bound) {
    filterSel.addEventListener('change', () => buildStreams());
    filterSel.dataset.bound = '1';
  }

  const liveStreams = getLiveStreams();
  const filteredStreams = applyViewerStreamFilter(liveStreams);
  const cardsHtml = filteredStreams.map((s) => streamCardHtml(s)).join('');
  el.innerHTML = cardsHtml + cardsHtml;
  if (typeof lucide !== 'undefined') lucide.createIcons();
  el.querySelectorAll('.str-c').forEach((card) => {
    card.addEventListener('click', () => openStream(parseInt(card.dataset.streamId, 10)));
  });

  function loopScroll() {
    const oneSet = el.scrollWidth / 2;
    let left = scrollEl.scrollLeft;
    if (oneSet <= 0) return;
    if (left >= oneSet) scrollEl.scrollLeft = left - oneSet;
    else if (left <= 0) scrollEl.scrollLeft = left + oneSet;
  }

  if (!scrollEl.dataset.viewerScrollBound) {
    let ticking = false;
    scrollEl.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => { loopScroll(); ticking = false; });
    });
    scrollEl.dataset.viewerScrollBound = '1';
  }

  // Avoid horizontal "shake" when user changes filters by preserving position.
  window.requestAnimationFrame(() => {
    scrollEl.scrollLeft = preserveScroll ? prevScrollLeft : 0;
    scrollEl.dataset.viewerScrollInitialized = '1';
  });

  buildFollowing();
}

/**
 * Open stream detail and navigate to stream page.
 * Viewer-focused profile: hook (name, live, game, Twitch, pool) → trust stats → triggers with ranges → recent drops.
 * @param {number} id - Stream id
 */
export function openStream(id) {
  const s = STREAMS.find((x) => x.id === id);
  if (!s) return;

  const sdAva = document.getElementById('sdAva');
  const sdName = document.getElementById('sdName');
  const sdGame = document.getElementById('sdGame');
  const sdLiveBadge = document.getElementById('sdLiveBadge');
  const sdOfflineBadge = document.getElementById('sdOfflineBadge');
  const sdViewers = document.getElementById('sdViewers');
  const sdTwitch = document.getElementById('sdTwitch');
  const sdPool = document.getElementById('sdPool');
  const sdTotalDrops = document.getElementById('sdTotalDrops');
  const sdTotalVal = document.getElementById('sdTotalVal');
  const sdAvgDrop = document.getElementById('sdAvgDrop');
  const sdSuccessRate = document.getElementById('sdSuccessRate');
  const sdStreamerTriggers = document.getElementById('sdStreamerTriggers');
  const sdRecentDrops = document.getElementById('sdRecentDrops');

  const role = getRole();
  const showStreamerPanel = role === 's';
  const sdRoleCardTitle = document.getElementById('sdRoleCardTitle');
  const sdViewerEligibility = document.getElementById('sdViewerEligibility');
  const sdStreamerTriggersPanel = document.getElementById('sdStreamerTriggersPanel');

  if (sdRoleCardTitle) {
    sdRoleCardTitle.innerHTML = showStreamerPanel
      ? '<i data-lucide="crosshair" class="lc-sm" style="color:var(--ac)"></i> Active triggers'
      : '<i data-lucide="ticket-check" class="lc-sm" style="color:var(--ac)"></i> Drop Eligibility';
  }
  if (sdViewerEligibility) sdViewerEligibility.style.display = showStreamerPanel ? 'none' : '';
  if (sdStreamerTriggersPanel) sdStreamerTriggersPanel.style.display = showStreamerPanel ? '' : 'none';

  if (sdAva) sdAva.textContent = s.ava;
  if (sdName) sdName.textContent = s.name;
  if (sdGame) sdGame.textContent = s.game;
  if (sdViewers) sdViewers.textContent = s.viewers.toLocaleString();

  const isLive = s.live !== false;
  if (sdLiveBadge) sdLiveBadge.style.display = isLive ? '' : 'none';
  if (sdOfflineBadge) sdOfflineBadge.style.display = isLive ? 'none' : '';

  if (sdTwitch) {
    const slug = s.twitch || s.name.toLowerCase().replace(/\s+/g, '');
    sdTwitch.href = `https://www.twitch.tv/${slug}`;
    sdTwitch.style.display = s.twitch ? '' : 'none';
  }
  wireStreamActions(s);

  if (sdPool) sdPool.innerHTML = `<i data-lucide="gift" class="lc-sm"></i> ${s.pool} skins in pool · $${s.poolVal} total value`;

  const totalDrops = s.totalDrops ?? 0;
  const totalVal = s.totalDroppedVal ?? 0;
  const avgVal = totalDrops > 0 ? Math.round(totalVal / totalDrops) : 0;
  const successRate = s.successRate ?? 0;

  if (sdTotalDrops) sdTotalDrops.textContent = totalDrops.toLocaleString();
  if (sdTotalVal) sdTotalVal.textContent = `$${totalVal.toLocaleString()}`;
  if (sdAvgDrop) sdAvgDrop.textContent = `$${avgVal}`;
  if (sdSuccessRate) sdSuccessRate.textContent = `${successRate}%`;

  if (sdStreamerTriggers) {
    sdStreamerTriggers.innerHTML = s.triggers.map((t) => {
      const tr = TRIGGERS.find((x) => x.ico === t);
      const range = tr && tr.min != null && tr.max != null ? ` → $${tr.min}–$${tr.max}` : '';
      return `<div class="trig-r"><div class="trig-ico" style="background:var(--rd-s);color:var(--rd)"><i data-lucide="${t}" class="lc"></i></div><div class="trig-info"><div class="trig-n">${tr ? tr.n : t}${range}</div></div><span class="st st-on">Active</span></div>`;
    }).join('');
  }

  const recent = RECENT_DROPS_BY_STREAM[s.id] || [];
  if (sdRecentDrops) {
    if (recent.length === 0) {
      sdRecentDrops.innerHTML = '<div class="sd-recent-empty">No recent drops yet. Drops show here once the streamer sends skins.</div>';
    } else {
      sdRecentDrops.innerHTML = recent.map((d) =>
        `<div class="sd-recent-item"><div class="sd-recent-skin">${d.skin}</div><div class="sd-recent-meta"><span class="sd-recent-winner">${d.winner}</span> · ${d.time}</div></div>`
      ).join('');
    }
  }

  go('stream');
  if (typeof lucide !== 'undefined') lucide.createIcons();
}
