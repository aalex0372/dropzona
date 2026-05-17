/**
 * DROPZONE Mobile — Live Skin Drops
 * Same data & routing + bottom nav & drawer for iOS.
 */

const STREAMS = [
  { id: 1, name: 'AlexPlays', ava: 'AP', game: 'CS2 · Ranked · Mirage', viewers: 1240, pool: 12, poolVal: 420, triggers: ['target', 'skull', 'crown', 'timer'], live: true, twitch: 'alexplays', totalDrops: 847, totalDroppedVal: 12420, successRate: 98 },
  { id: 2, name: 'LunaLive', ava: 'LL', game: 'CS2 · FaceIT · Inferno', viewers: 856, pool: 8, poolVal: 210, triggers: ['target', 'flame', 'crown', 'flag'], live: true, twitch: 'lunalive', totalDrops: 612, totalDroppedVal: 8920, successRate: 97 },
  { id: 3, name: 'DonnyG', ava: 'DG', game: 'CS2 · Premier · Dust2', viewers: 245, pool: 5, poolVal: 95, triggers: ['flame', 'swords', 'rocket', 'shield-check'], live: false, twitch: 'donnyg', totalDrops: 334, totalDroppedVal: 4100, successRate: 96 },
  { id: 4, name: 'NikoVibes', ava: 'NV', game: 'CS2 · Ranked · Nuke', viewers: 920, pool: 10, poolVal: 310, triggers: ['skull', 'crown', 'flag', 'trophy'], live: true, twitch: 'nikovibes', totalDrops: 721, totalDroppedVal: 10850, successRate: 99 },
  { id: 5, name: 'DevLive', ava: 'DL', game: 'CS2 · FaceIT · Overpass', viewers: 780, pool: 9, poolVal: 185, triggers: ['target', 'flame', 'swords', 'rocket'], live: false, twitch: 'devlive', totalDrops: 445, totalDroppedVal: 6200, successRate: 95 },
  { id: 6, name: 'MonoPlays', ava: 'MP', game: 'CS2 · Premier · Ancient', viewers: 1100, pool: 14, poolVal: 520, triggers: ['crown', 'skull', 'shield-check', 'flag'], live: true, twitch: 'monoplays', totalDrops: 923, totalDroppedVal: 15200, successRate: 98 },
  { id: 7, name: 'ShadowAim', ava: 'SA', game: 'CS2 · Ranked · Anubis', viewers: 420, pool: 6, poolVal: 140, triggers: ['target', 'swords', 'rocket'], live: false, twitch: 'shadowaim', totalDrops: 288, totalDroppedVal: 3650, successRate: 94 },
  { id: 8, name: 'ElectroGo', ava: 'EG', game: 'CS2 · FaceIT · Vertigo', viewers: 650, pool: 7, poolVal: 220, triggers: ['flame', 'skull', 'flag', 'timer'], live: true, twitch: 'electrogo', totalDrops: 512, totalDroppedVal: 7800, successRate: 97 },
  { id: 9, name: 'RustyAim', ava: 'RA', game: 'CS2 · Ranked · Mirage', viewers: 580, pool: 8, poolVal: 195, triggers: ['target', 'flame', 'crown'], live: true, twitch: 'rustyaim', totalDrops: 398, totalDroppedVal: 5400, successRate: 96 },
  { id: 10, name: 'TwistPlays', ava: 'TP', game: 'CS2 · Premier · Inferno', viewers: 390, pool: 5, poolVal: 98, triggers: ['shield-check', 'trophy'], live: true, twitch: 'twistplays', totalDrops: 267, totalDroppedVal: 3200, successRate: 95 },
  { id: 11, name: 'JakeStream', ava: 'JK', game: 'CS2 · Ranked · Mirage', viewers: 412, pool: 6, poolVal: 165, triggers: ['target', 'flame', 'flag'], live: true, twitch: 'jakestream', totalDrops: 189, totalDroppedVal: 2800, successRate: 94 },
  { id: 12, name: 'MayaPlays', ava: 'MY', game: 'CS2 · FaceIT · Inferno', viewers: 588, pool: 7, poolVal: 198, triggers: ['crown', 'swords', 'rocket'], live: true, twitch: 'mayaplays', totalDrops: 356, totalDroppedVal: 5100, successRate: 97 },
  { id: 13, name: 'ChrisCS', ava: 'CC', game: 'CS2 · Premier · Dust2', viewers: 721, pool: 9, poolVal: 244, triggers: ['target', 'skull', 'crown', 'flag'], live: true, twitch: 'chriscs', totalDrops: 478, totalDroppedVal: 7200, successRate: 98 },
  { id: 14, name: 'SamPlays', ava: 'SP', game: 'CS2 · Ranked · Nuke', viewers: 334, pool: 4, poolVal: 89, triggers: ['flame', 'flag'], live: true, twitch: 'samplays', totalDrops: 156, totalDroppedVal: 1900, successRate: 93 },
  { id: 15, name: 'RileyLive', ava: 'RL', game: 'CS2 · FaceIT · Overpass', viewers: 892, pool: 11, poolVal: 312, triggers: ['skull', 'crown', 'shield-check'], live: true, twitch: 'rileylive', totalDrops: 634, totalDroppedVal: 9500, successRate: 98 },
  { id: 16, name: 'JordanAim', ava: 'JA', game: 'CS2 · Premier · Ancient', viewers: 556, pool: 8, poolVal: 176, triggers: ['crown', 'timer', 'trophy'], live: true, twitch: 'jordanaim', totalDrops: 312, totalDroppedVal: 4400, successRate: 96 }
];
const SKINS = [
  { name: 'Desert Eagle | Blaze', rarity: 'cv' },
  { name: 'AWP | Asiimov', rarity: 'cv' },
  { name: 'Glock-18 | Fade', rarity: 'cv' },
  { name: 'USP-S | Kill Confirmed', rarity: 'cv' },
  { name: 'AK-47 | Redline', rarity: 'cl' },
  { name: 'M4A4 | Desolate Space', rarity: 'cl' },
  { name: 'P250 | Muertos', rarity: 'rs' },
  { name: 'M4A1-S | Hyper Beast', rarity: 'cl' },
  { name: 'AWP | Lightning Strike', rarity: 'cv' },
  { name: 'Nova | Antique', rarity: 'ms' },
  { name: 'MAC-10 | Fade', rarity: 'rs' }
];
const USERS = ['xDreamer', 'NaVi_fan228', 'pro100_gamer', 'steelskin99', 'kr1stal_', 'maxplay_cs', 'AWP_god', 'noob_slayer'];
const TRIGGERS = [
  // from "light" → "heavy" (cosmetic order for mobile)
  { n: 'kill', ico: 'target', cls: 'kill', min: 2, max: 8 },
  { n: 'double kill', ico: 'crosshair', cls: 'kill', min: 4, max: 15 },
  { n: 'Triple kill', ico: 'skull', cls: 'kill', min: 7, max: 25 },
  { n: 'Quadra kill', ico: 'swords', cls: 'kill', min: 12, max: 40 },
  { n: 'ACE', ico: 'crown', cls: 'kill', min: 20, max: 60 },
  { n: 'round win', ico: 'flag', cls: 'win', min: 25, max: 70 },
  { n: 'bomb planted', ico: 'bomb', cls: 'bomb', min: 30, max: 90 },
  { n: 'Bomb Defused', ico: 'shield-check', cls: 'bomb', min: 35, max: 100 },
  { n: 'MVP', ico: 'award', cls: 'bomb', min: 45, max: 130 },
  { n: 'game win', ico: 'trophy', cls: 'win', min: 60, max: 200 }
];

const RECENT_DROPS_BY_STREAM = {
  1: [
    { skin: 'AK-47 | Redline (FT)', winner: 'xDreamer', time: '2h ago' },
    { skin: 'AWP | Asiimov (FT)', winner: 'NaVi_fan228', time: '5h ago' },
    { skin: 'M4A4 | Desolate Space (MW)', winner: 'pro100_gamer', time: '8h ago' },
    { skin: 'USP-S | Kill Confirmed (MW)', winner: 'steelskin99', time: '12h ago' },
    { skin: 'Glock-18 | Fade (FN)', winner: 'kr1stal_', time: '1d ago' }
  ],
  2: [
    { skin: 'P250 | Muertos (FN)', winner: 'maxplay_cs', time: '1h ago' },
    { skin: 'Nova | Antique (FT)', winner: 'AWP_god', time: '4h ago' },
    { skin: 'MAC-10 | Fade (MW)', winner: 'noob_slayer', time: '9h ago' }
  ],
  4: [
    { skin: 'Desert Eagle | Blaze (FN)', winner: 'xDreamer', time: '3h ago' },
    { skin: 'AWP | Lightning Strike (FT)', winner: 'NaVi_fan228', time: '6h ago' },
    { skin: 'M4A1-S | Hyper Beast (FT)', winner: 'pro100_gamer', time: '11h ago' }
  ],
  6: [
    { skin: 'AWP | Asiimov (FT)', winner: 'steelskin99', time: '30m ago' },
    { skin: 'AK-47 | Redline (FT)', winner: 'kr1stal_', time: '2h ago' },
    { skin: 'Clutch 1v3 → M4A4 | Desolate Space', winner: 'maxplay_cs', time: '5h ago' },
    { skin: 'Knife Kill → Glock-18 | Fade', winner: 'AWP_god', time: '1d ago' }
  ]
};

/** Streamer names the user follows (some may be offline) */
const FOLLOWING_NAMES = ['AlexPlays', 'LunaLive', 'DonnyG', 'NikoVibes', 'DevLive', 'MonoPlays', 'ShadowAim'];
const TRIGGER_ICO_CLASS = {
  target: 'gn',
  flame: 'or',
  crosshair: 'or',
  skull: 'rd',
  swords: 'pk',
  crown: 'or',
  flag: 'ac',
  rocket: 'cy',
  bomb: 'cy',
  'shield-check': 'gn',
  timer: 'bl',
  award: 'bl',
  trophy: 'ac'
};

let dropCounter = 1050;
let feedCount = 0;
let role = 'v';
let curPage = 'browse';
let wizStep = 1;
let simInterval;

let streamActionsOutsideClickHandler = null;
let streamActionsRepositionHandler = null;

function getViewerStreamFilterMode() {
  const sel = document.getElementById('viewerStreamFilter');
  return sel?.value || 'most-viewers';
}

const PM = {
  'browse': ['Live Streams', 'Watch streams — win skins'],
  'stream': ['Stream', 'Participate in drops in real time'],
  'my-drops': ['My Drops', 'History of won skins'],
  'profile': ['Profile', 'Account & connections'],
  's-profile': ['Profile', 'Account & connections'],
  'v-settings': ['Settings', 'Notifications & account'],
  's-dash': ['Dashboard', 'Manage your stream in real time'],
  's-wallet': ['Wallet', 'Top up, withdraw, and track transactions'],
  's-triggers': ['Triggers', 'Configure game event drops'],
  's-hist': ['History', 'All drops and payouts'],
  's-health': ['Health', 'System status & errors'],
  's-onboard': ['Setup Wizard', 'Connect your CS2 game agent'],
  's-settings': ['Settings', 'API, bot & overlay'],
};

const STREAMER_PAGES = ['s-dash', 's-wallet', 's-triggers', 's-health', 's-settings', 's-onboard', 's-hist', 's-profile'];
const WIZARD_STEPS = 3;

function rnd(a) { return a[Math.floor(Math.random() * a.length)]; }
function rndPrice() { return (Math.random() * 50 + 3).toFixed(2); }

function buildTicker() {
  const items = [];
  for (let i = 0; i < 10; i++) {
    const skin = rnd(SKINS);
    items.push(`<span class="ticker-i"><b>${rnd(USERS)}</b> won <span class="sk-r sk-${skin.rarity}">${skin.name}</span></span><span class="ticker-sep">·</span>`);
  }
  const el = document.getElementById('tickerContent');
  if (el) el.innerHTML = items.join('') + items.join('');
}

function buildFollowing() {
  const el = document.getElementById('followingList');
  if (!el) return;
  const liveNames = new Set(STREAMS.map(s => s.name));
  el.innerHTML = FOLLOWING_NAMES.map(name => {
    const stream = STREAMS.find(s => s.name === name);
    const isLive = liveNames.has(name);
    const id = stream ? stream.id : null;
    const dataId = id ? ` data-stream-id="${id}"` : '';
    return `<span class="following-chip ${isLive ? 'live' : ''}"${dataId}>${name} ${isLive ? '<span class="chip-dot"></span><span class="chip-status">LIVE</span>' : '<span class="chip-status">Offline</span>'}</span>`;
  }).join('');
  el.querySelectorAll('.following-chip.live[data-stream-id]').forEach(chip => {
    chip.addEventListener('click', () => openStream(parseInt(chip.dataset.streamId, 10)));
  });
}

function buildStreams() {
  const el = document.getElementById('streamGrid');
  if (!el) return;
  const mode = getViewerStreamFilterMode();
  let list = STREAMS.filter(s => s.live !== false);

  if (mode === 'most-viewers') {
    list = list.sort((a, b) => (b.viewers ?? 0) - (a.viewers ?? 0));
  } else if (mode === 'fewest-viewers') {
    list = list.sort((a, b) => (a.viewers ?? 0) - (b.viewers ?? 0));
  } else if (mode === 'most-drops') {
    list = list.sort((a, b) => (b.totalDrops ?? 0) - (a.totalDrops ?? 0));
  } else if (mode === 'following-only') {
    list = list
      .filter((s) => FOLLOWING_NAMES.includes(s.name))
      .sort((a, b) => (b.viewers ?? 0) - (a.viewers ?? 0));
  }

  el.innerHTML = list.map(s => `
    <div class="str-c" data-stream-id="${s.id}">
      <div class="str-prev"><div class="gv"><i data-lucide="gamepad-2" style="width:64px;height:64px;stroke-width:1"></i></div>
        <div class="str-br"><div class="b-live"><span class="dot"></span> LIVE</div><div class="b-view"><i data-lucide="eye" class="lc-sm"></i> ${s.viewers.toLocaleString()}</div></div>
        <div class="str-pool"><i data-lucide="gift" class="lc-sm"></i> ${s.pool} skins · $${s.poolVal}</div>
      </div>
      <div class="str-meta">
        <div class="str-ava">${s.ava}</div>
        <div style="flex:1"><div class="str-name">${s.name}</div></div>
      </div>
    </div>`).join('');
  if (typeof lucide !== 'undefined') lucide.createIcons();
  el.querySelectorAll('.str-c').forEach(card => {
    card.addEventListener('click', () => openStream(parseInt(card.dataset.streamId, 10)));
  });
  buildFollowing();
}

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
      reportModal.setAttribute('aria-hidden', 'false');
      lockBodyScroll();
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
    if (!reportModal) return;
    if (reportModal.style.display === 'none') return;
    reportModal.style.display = 'none';
    reportModal.setAttribute('aria-hidden', 'true');
    unlockBodyScroll();
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
    if (!actionsMenu.contains(ev.target) && !shareMenuBtn.contains(ev.target)) {
      actionsMenu.style.display = 'none';
    }
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

function openStream(id) {
  const s = STREAMS.find(x => x.id === id);
  if (!s) return;
  const sdAva = document.getElementById('sdAva');
  const sdName = document.getElementById('sdName');
  const sdViewers = document.getElementById('sdViewers');
  const sdPool = document.getElementById('sdPool');
  const sdTwitch = document.getElementById('sdTwitch');
  const sdTotalDrops = document.getElementById('sdTotalDrops');
  const sdTotalVal = document.getElementById('sdTotalVal');
  const sdAvgDrop = document.getElementById('sdAvgDrop');
  const sdSuccessRate = document.getElementById('sdSuccessRate');
  const sdTriggers = document.getElementById('sdTriggers');

  const sdRoleCardTitle = document.getElementById('sdRoleCardTitle');
  const sdViewerEligibility = document.getElementById('sdViewerEligibility');
  const sdStreamerTriggersPanel = document.getElementById('sdStreamerTriggersPanel');
  const sdRecentDrops = document.getElementById('sdRecentDrops');

  const showStreamerPanel = role === 's';
  if (sdRoleCardTitle) {
    sdRoleCardTitle.innerHTML = showStreamerPanel
      ? '<i data-lucide="crosshair" class="lc-sm ac"></i> Active triggers'
      : '<i data-lucide="ticket-check" class="lc-sm ac"></i> Drop Eligibility';
  }
  if (sdViewerEligibility) sdViewerEligibility.style.display = showStreamerPanel ? 'none' : '';
  if (sdStreamerTriggersPanel) sdStreamerTriggersPanel.style.display = showStreamerPanel ? '' : 'none';

  if (sdAva) sdAva.textContent = s.ava;
  if (sdName) sdName.textContent = s.name;
  if (sdTwitch) {
    const slug = s.twitch || s.name.toLowerCase().replace(/\s+/g, '');
    sdTwitch.href = `https://www.twitch.tv/${slug}`;
    sdTwitch.style.display = s.twitch ? '' : 'none';
  }
  if (sdViewers) sdViewers.textContent = s.viewers.toLocaleString();
  if (sdPool) sdPool.innerHTML = `<i data-lucide="gift" class="lc-sm"></i> ${s.pool} skins in pool · $${s.poolVal} total value`;

  const totalDrops = s.totalDrops ?? 0;
  const totalVal = s.totalDroppedVal ?? 0;
  const avgVal = totalDrops > 0 ? Math.round(totalVal / totalDrops) : 0;
  const successRate = s.successRate ?? 0;

  if (sdTotalDrops) sdTotalDrops.textContent = totalDrops.toLocaleString();
  if (sdTotalVal) sdTotalVal.textContent = `$${totalVal.toLocaleString()}`;
  if (sdAvgDrop) sdAvgDrop.textContent = `$${avgVal}`;
  if (sdSuccessRate) sdSuccessRate.textContent = `${successRate}%`;

  if (sdTriggers) {
    sdTriggers.innerHTML = s.triggers.map(t => {
      const tr = TRIGGERS.find(x => x.ico === t);
      const cls = TRIGGER_ICO_CLASS[t] || 'ac';
      const range = tr && tr.min != null && tr.max != null ? ` → $${tr.min}–$${tr.max}` : '';
      return `<div class="trig-r"><div class="trig-ico ${cls}"><i data-lucide="${t}" class="lc"></i></div><div class="trig-info"><div class="trig-n">${tr ? tr.n : t}${range}</div></div><span class="st st-on">Active</span></div>`;
    }).join('');
  }

  if (sdRecentDrops) {
    const recent = RECENT_DROPS_BY_STREAM[s.id] || [];
    if (recent.length === 0) {
      sdRecentDrops.innerHTML = '<div class="sd-recent-empty">No recent drops yet. Drops show here once the streamer sends skins.</div>';
    } else {
      sdRecentDrops.innerHTML = recent.map(d =>
        `<div class="sd-recent-item"><div class="sd-recent-skin">${d.skin}</div><div class="sd-recent-meta"><span class="sd-recent-winner">${d.winner}</span> · ${d.time}</div></div>`
      ).join('');
    }
  }

  wireStreamActions(s);
  go('stream');
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function addFeedEvent(type, msg) {
  feedCount++;
  const el = document.getElementById('feedList');
  if (!el) return;
  const row = document.createElement('div');
  row.className = 'feed-r';
  row.style.animation = 'pageIn .3s ease';
  row.innerHTML = `<div class="fd ${type}"></div><div class="fm">${msg}</div><div class="ft">now</div>`;
  el.insertBefore(row, el.firstChild);
  if (el.children.length > 15) el.removeChild(el.lastChild);
  const feedCountEl = document.getElementById('feedCount');
  if (feedCountEl) feedCountEl.textContent = feedCount + ' today';
}

function addSFeedEvent(type, msg) {
  const el = document.getElementById('sFeedList');
  if (!el) return;
  const row = document.createElement('div');
  row.className = 'feed-r';
  row.style.animation = 'pageIn .3s ease';
  row.innerHTML = `<div class="fd ${type}"></div><div class="fm">${msg}</div><div class="ft">now</div>`;
  el.insertBefore(row, el.firstChild);
  if (el.children.length > 12) el.removeChild(el.lastChild);
}

function simulateTrigger() {
  const trig = rnd(TRIGGERS);
  const stream = rnd(STREAMS);
  const user = rnd(USERS);
  const skin = rnd(SKINS);
  const skinName = skin.name;
  const skCls = 'sk-' + (skin.rarity || 'cv');
  const price = rndPrice();
  dropCounter++;
  addFeedEvent('kill', `<b>${stream.name}</b> — ${trig.n}! Drop activated`);
  addSFeedEvent('kill', `<b>${trig.n}</b> on ${stream.game.split('·')[2] ? stream.game.split('·')[2].trim() : 'map'} — drop #${dropCounter}`);
  setTimeout(() => {
    addFeedEvent('drop', `<b>${user}</b> selected as winner → <span class="sk ${skCls}">${skinName}</span>`);
    addSFeedEvent('drop', `Winner: <b>${user}</b> → <span class="hl ${skCls}">${skinName}</span> ($${price})`);
  }, 1200);
  setTimeout(() => { addSFeedEvent('trade', `Trade offer #${dropCounter} sent to <b>${user}</b>`); }, 2800);
  setTimeout(() => {
    if (Math.random() > 0.2) {
      addFeedEvent('trade', `<b>${user}</b> accepted trade <span class="hl ${skCls}">${skinName}</span>`);
      addSFeedEvent('trade', `✓ Trade #${dropCounter} accepted — <b>${user}</b>`);
    } else {
      addSFeedEvent('fail', `✗ Trade #${dropCounter} expired — item returned to pool`);
    }
  }, 5000);
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function startSim() {
  simInterval = setInterval(() => {
    if (Math.random() > 0.4) simulateTrigger();
    else {
      const u = rnd(USERS);
      addFeedEvent('join', `<b>${u}</b> joined · Twitch ✓ · Trade URL ✓`);
    }
  }, 8000);
}

function updateWizFootCounter(step) {
  const el = document.getElementById('gsiFootCounter');
  if (el) el.textContent = 'Step ' + step + ' of ' + WIZARD_STEPS;
}

function wizNext() {
  if (wizStep < WIZARD_STEPS) {
    const panel = document.getElementById('wiz-' + wizStep);
    if (panel) panel.style.display = 'none';
    const steps = document.getElementById('wizSteps');
    if (steps && steps.children[wizStep - 1]) {
      steps.children[wizStep - 1].classList.remove('cur');
      steps.children[wizStep - 1].classList.add('done');
    }
    wizStep++;
    if (steps && steps.children[wizStep - 1]) steps.children[wizStep - 1].classList.add('cur');
    const nextPanel = document.getElementById('wiz-' + wizStep);
    if (nextPanel) nextPanel.style.display = 'block';
    const wizPrevBtn = document.getElementById('wizPrev');
    if (wizPrevBtn) wizPrevBtn.style.visibility = 'visible';
    const wizNextBtn = document.getElementById('wizNextBtn');
    if (wizNextBtn) wizNextBtn.innerHTML = wizStep === WIZARD_STEPS ? 'Finish <i data-lucide="check" class="lc-sm"></i>' : 'Next <i data-lucide="arrow-right" class="lc-sm"></i>';
    updateWizFootCounter(wizStep);
    if (typeof lucide !== 'undefined') lucide.createIcons();
  } else {
    go('s-dash');
  }
}

function wizPrev() {
  if (wizStep > 1) {
    const panel = document.getElementById('wiz-' + wizStep);
    if (panel) panel.style.display = 'none';
    const steps = document.getElementById('wizSteps');
    if (steps && steps.children[wizStep - 1]) {
      steps.children[wizStep - 1].classList.remove('cur');
      wizStep--;
      steps.children[wizStep - 1].classList.remove('done');
      steps.children[wizStep - 1].classList.add('cur');
    }
    const prevPanel = document.getElementById('wiz-' + wizStep);
    if (prevPanel) prevPanel.style.display = 'block';
    const wizPrevBtn = document.getElementById('wizPrev');
    if (wizPrevBtn) wizPrevBtn.style.visibility = wizStep === 1 ? 'hidden' : 'visible';
    const wizNextBtn = document.getElementById('wizNextBtn');
    if (wizNextBtn) wizNextBtn.innerHTML = 'Next <i data-lucide="arrow-right" class="lc-sm"></i>';
    updateWizFootCounter(wizStep);
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
}

/* CS2 Game State Integration onboarding helpers */
function _generateGsiToken() {
  const bytes = new Uint8Array(32);
  (window.crypto || window.msCrypto).getRandomValues(bytes);
  return Array.prototype.map.call(bytes, (b) => ('0' + b.toString(16)).slice(-2)).join('');
}
function _getGsiToken() {
  let t = localStorage.getItem('dropzona_gsi_token');
  if (!t) { t = _generateGsiToken(); localStorage.setItem('dropzona_gsi_token', t); }
  return t;
}
function _buildGsiConfig(token) {
  return [
    '"Console Sample v.1"',
    '{',
    '"uri" "https://localhost:5054/gsi"',
    '"timeout" "5.0"',
    '"buffer" "0.0"',
    '"throttle" "0.1"',
    '"heartbeat" "60.0"',
    '"auth"',
    '{',
    '"token" "' + token + '"',
    '}',
    '"output"',
    '{',
    '"precision_time" "3"',
    '"precision_position" "1"',
    '"precision_vector" "3"',
    '}',
    '"data"',
    '{',
    '"provider" "1"',
    '"map" "1"',
    '"round" "1"',
    '"player_id" "1"',
    '"player_state" "1"',
    '"player_weapons" "1"',
    '"player_match_stats" "1"',
    '"bomb" "1"',
    '}',
    '}',
    ''
  ].join('\n');
}
function refreshGsiPreview() {
  const pre = document.getElementById('gsiPreview');
  if (pre) pre.textContent = _buildGsiConfig(_getGsiToken());
}
function downloadGsiConfig() {
  const token = _getGsiToken();
  const content = _buildGsiConfig(token);
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'gamestate_integration_gsi.cfg';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(() => { URL.revokeObjectURL(url); }, 1000);
  const st = document.getElementById('gsiDlStatus');
  if (st) st.style.display = 'flex';
  refreshGsiPreview();
  if (typeof lucide !== 'undefined') lucide.createIcons();
}
function copyGsiPath(btn) {
  const path = (document.getElementById('gsiPath')?.textContent || '').trim();
  if (!path) return;
  const done = () => {
    const orig = btn.innerHTML;
    btn.innerHTML = '<i data-lucide="check" class="lc-sm"></i> Copied!';
    btn.classList.add('gsi-copied');
    if (typeof lucide !== 'undefined') lucide.createIcons();
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.classList.remove('gsi-copied');
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }, 1600);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(path).then(done, done);
  } else {
    const ta = document.createElement('textarea');
    ta.value = path; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (_e) {}
    document.body.removeChild(ta); done();
  }
}
function checkGsiConnection() {
  const st = document.getElementById('gsiVerifyStatus');
  if (!st) return;
  st.innerHTML = '<div class="gsi-spinner" aria-hidden="true"></div><span>Checking…</span>';
  setTimeout(() => {
    st.innerHTML = '<i data-lucide="alert-circle" class="lc-sm" style="color:var(--or)"></i><span>Not detected yet. Make sure CS2 is running with the file in <code>csgo\\cfg</code>.</span>';
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }, 1400);
}

function setRole(r, landPageId) {
  role = r;
  localStorage.setItem('dropzona_role', r);
  const roleSl = document.getElementById('roleSl');
  if (roleSl) roleSl.classList.toggle('str', r === 's');
  const rBtnV = document.getElementById('rBtnV');
  const rBtnS = document.getElementById('rBtnS');
  if (rBtnV) rBtnV.classList.toggle('active', r === 'v');
  if (rBtnS) rBtnS.classList.toggle('active', r === 's');
  const navV = document.getElementById('navV');
  if (navV) navV.style.display = r === 'v' ? 'block' : 'none';
  const navS = document.getElementById('navS');
  if (navS) navS.style.display = r === 's' ? 'block' : 'none';
  const navSConfig = document.getElementById('navSConfig');
  if (navSConfig) navSConfig.style.display = r === 's' ? 'block' : 'none';
  const uRole = document.getElementById('uRole');
  if (uRole) uRole.textContent = r === 'v' ? 'Viewer' : 'Streamer';

  const bn = document.getElementById('bottomNav');
  if (bn) {
    const first = bn.querySelector('.bn-i');
    if (first) {
      const ico = first.querySelector('.bn-ico');
      const label = first.querySelector('span');
      if (r === 's') {
        first.dataset.p = 's-dash';
        if (label) label.textContent = 'Dashboard';
        if (ico) { ico.setAttribute('data-lucide', 'layout-dashboard'); }
      } else {
        first.dataset.p = 'browse';
        if (label) label.textContent = 'Live';
        if (ico) { ico.setAttribute('data-lucide', 'compass'); }
      }
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }
  }
  go(landPageId || (r === 'v' ? 'browse' : 's-dash'));
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

/**
 * Resolve a desktop /app URL path to the equivalent mobile pageId so that
 * shared links land on the right screen instead of dumping the user on
 * the home page.
 */
const DESKTOP_PATH_TO_PAGE = {
  '/app': 'browse',
  '/app/browse': 'browse',
  '/app/followings': 'browse',
  '/app/stream': 'stream',
  '/app/my-drops': 'my-drops',
  '/app/profile': 'profile',
  '/app/s/dashboard': 's-dash',
  '/app/s/wallet': 's-wallet',
  '/app/s/triggers': 's-triggers',
  '/app/s/history': 's-hist',
  '/app/s/health': 's-health',
  '/app/s/profile': 's-profile',
  '/app/s/onboard': 's-onboard',
};

function resolveDeepLink() {
  let from = null;
  try {
    from = new URL(window.location.href).searchParams.get('from');
  } catch (_e) {
    return;
  }
  if (!from) return;
  let decoded;
  try { decoded = decodeURIComponent(from); } catch (_e) { return; }
  const path = decoded.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';
  const pageId = DESKTOP_PATH_TO_PAGE[path];

  // Clean the ?from off the URL so refresh doesn't re-route.
  try {
    const clean = window.location.origin + window.location.pathname;
    window.history.replaceState({}, '', clean);
  } catch (_e) { /* noop */ }

  if (!pageId || !PM[pageId]) return;
  // Streamer pages: switch role at the same time so the nav matches.
  if (pageId.startsWith('s-') && role !== 's') {
    setRole('s', pageId);
  } else {
    go(pageId);
  }
}

function updateBottomNav() {
  const bn = document.getElementById('bottomNav');
  if (!bn) return;
  const tabs = bn.querySelectorAll('.bn-i');
  const tab0Pages = role === 's'
    ? ['s-dash', 's-wallet', 's-triggers', 's-health', 's-settings', 's-onboard', 's-hist']
    : ['browse', 'stream'];
  const tab1Pages = ['my-drops'];
  const tab2Pages = role === 's' ? ['s-profile'] : ['profile', 'v-settings'];
  const groups = [tab0Pages, tab1Pages, tab2Pages];
  tabs.forEach((tab, i) => {
    const pages = groups[i] || [];
    tab.classList.toggle('active', pages.indexOf(curPage) !== -1);
  });
  // Profile tab routes role-aware
  const profileTab = tabs[2];
  if (profileTab) profileTab.dataset.p = role === 's' ? 's-profile' : 'profile';
}

function go(p) {
  curPage = p;
  document.querySelectorAll('.page').forEach(x => x.classList.remove('act'));
  const t = document.getElementById('p-' + p);
  if (t) t.classList.add('act');
  document.querySelectorAll('.ni').forEach(n => n.classList.remove('act'));
  const ni = document.querySelector('.ni[data-p="' + p + '"]');
  if (ni) ni.classList.add('act');
  const m = PM[p];
  const pgT = document.getElementById('pgT');
  const pgS = document.getElementById('pgS');
  if (m && pgT) pgT.textContent = m[0];
  if (m && pgS) pgS.textContent = m[1];
  updateBottomNav();
  closeDrawer();
  document.dispatchEvent(new window.CustomEvent('dropzona:page-change', { detail: { pageId: p } }));
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

/* Body-scroll lock that preserves the scroll position. Stacks across
 * multiple modals (drawer + report) — only unlocks when count hits 0.
 */
let __lockCount = 0;
let __lockedScrollY = 0;
function lockBodyScroll() {
  if (__lockCount === 0) {
    __lockedScrollY = window.scrollY || window.pageYOffset || 0;
    document.documentElement.classList.add('lock-scroll');
    document.body.style.top = `-${__lockedScrollY}px`;
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
  }
  __lockCount++;
}
function unlockBodyScroll() {
  __lockCount = Math.max(0, __lockCount - 1);
  if (__lockCount === 0) {
    document.documentElement.classList.remove('lock-scroll');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, __lockedScrollY);
  }
}

function openDrawer() {
  const drawer = document.getElementById('drawer');
  const overlay = document.getElementById('overlay');
  overlay?.classList.add('open');
  drawer?.classList.add('open');
  if (drawer) drawer.setAttribute('aria-hidden', 'false');
  lockBodyScroll();
}

function closeDrawer() {
  const drawer = document.getElementById('drawer');
  const overlay = document.getElementById('overlay');
  if (!drawer || !drawer.classList.contains('open')) return;
  overlay?.classList.remove('open');
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  unlockBodyScroll();
}

/* Esc-to-close for drawer + report modal */
function handleGlobalKeydown(e) {
  if (e.key !== 'Escape' && e.key !== 'Esc') return;
  const drawer = document.getElementById('drawer');
  const reportModal = document.getElementById('sdReportModal');
  if (reportModal && reportModal.style.display !== 'none') {
    reportModal.style.display = 'none';
    reportModal.setAttribute('aria-hidden', 'true');
    unlockBodyScroll();
    e.preventDefault();
    return;
  }
  if (drawer && drawer.classList.contains('open')) {
    closeDrawer();
    e.preventDefault();
  }
}

/* When the iOS / Android soft keyboard opens, the visual viewport
 * shrinks. Toggle a class so the bottom nav can hide and stop fighting
 * the keyboard. Falls back to a focusin/focusout heuristic when
 * visualViewport isn't available (older Android WebViews).
 */
function installKeyboardWatcher() {
  const root = document.documentElement;
  const setKbOpen = (open) => root.classList.toggle('kb-open', !!open);
  if (window.visualViewport) {
    const vv = window.visualViewport;
    const baseline = window.innerHeight;
    const check = () => {
      // Treat a >150px shrink of the visual viewport as "keyboard open".
      setKbOpen((window.innerHeight - vv.height) > 150);
    };
    vv.addEventListener('resize', check);
    vv.addEventListener('scroll', check);
    void baseline;
  } else {
    document.addEventListener('focusin', (e) => {
      const t = e.target;
      if (!t) return;
      const editable = t.matches?.('input, textarea, [contenteditable], select');
      if (editable) setKbOpen(true);
    });
    document.addEventListener('focusout', () => {
      setTimeout(() => {
        const ae = document.activeElement;
        const stillEditable = ae && ae.matches?.('input, textarea, [contenteditable], select');
        if (!stillEditable) setKbOpen(false);
      }, 60);
    });
  }
}

/**
 * Log out: clear auth state and redirect to landing page.
 */
function dropzonaLogout() {
  localStorage.removeItem('dropzona_auth');
  window.location.href = '/';
}

/**
 * Hydrate profile fields with stored user data (best-effort).
 */
function hydrateUser() {
  const stored = JSON.parse(localStorage.getItem('dropzona_user') || 'null');
  if (!stored) return;
  const initials = stored.avatarInitials || stored.username.slice(0, 2).toUpperCase();
  const sinceText = stored.createdAt
    ? 'Member since ' + new Date(stored.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : null;
  const set = (id, val) => { const el = document.getElementById(id); if (el && val != null) el.textContent = val; };
  set('sProfileName', stored.username);
  set('sProfileAva', initials);
  if (sinceText) set('sProfileSince', sinceText);
}

window.go = go;
window.setRole = setRole;
window.openStream = openStream;
window.wizNext = wizNext;
window.wizPrev = wizPrev;
window.simulateTrigger = simulateTrigger;
window.downloadGsiConfig = downloadGsiConfig;
window.copyGsiPath = copyGsiPath;
window.checkGsiConnection = checkGsiConnection;
window.dropzonaLogout = dropzonaLogout;

function initWalletTopup() {
  const modeTitle = document.getElementById('walletModeTitle');
  const topupView = document.getElementById('walletTopupView');
  const withdrawView = document.getElementById('walletWithdrawView');
  const openWithdrawBtn = document.getElementById('walletOpenWithdrawBtn');
  const backToTopupBtn = document.getElementById('walletBackToTopupBtn');
  const amountInput = document.getElementById('walletAmountInput');
  const withdrawAmountInput = document.getElementById('walletWithdrawAmountInput');
  const converted = document.getElementById('walletAmountConverted');
  const withdrawConverted = document.getElementById('walletWithdrawConverted');
  const getsVal = document.getElementById('walletGetsVal');
  const receiveVal = document.getElementById('walletReceiveVal');
  const feeVal = document.getElementById('walletFeeVal');
  const walletAddressInput = document.getElementById('walletAddressInput');
  const walletAddressNetworkHint = document.getElementById('walletAddressNetworkHint');
  const cryptoBtns = Array.from(document.querySelectorAll('.wallet-crypto-btn[data-crypto][data-rate]'));
  const quickBtns = Array.from(document.querySelectorAll('.wallet-quick-btn[data-amount]'));
  const depositBtn = document.getElementById('walletDepositBtn');
  const withdrawBtn = document.getElementById('walletWithdrawBtn');
  const walletTxWrap = document.querySelector('.wallet-tx-table-wrap');
  const depositModal = document.getElementById('walletDepositModal');
  const depositModalClose = document.getElementById('walletDepositClose');
  const depositModalCloseInline = document.getElementById('walletDepositCloseInline');
  const depositModalCopy = document.getElementById('walletDepositCopyBtn');
  const depositSetAmountBtn = document.getElementById('walletDepositSetAmountBtn');
  const depositShareBtn = document.getElementById('walletDepositShareBtn');
  const depositNetworkLabel = document.getElementById('walletDepositNetworkLabel');
  const depositNetworkName = document.getElementById('walletDepositNetworkName');
  const depositCoinMark = document.getElementById('walletDepositCoinMark');
  const depositWarningText = document.getElementById('walletDepositWarningText');
  const depositExpected = document.getElementById('walletDepositExpected');
  const depositExpectedCrypto = document.getElementById('walletDepositExpectedCrypto');
  const depositAddress = document.getElementById('walletDepositAddress');

  if (!amountInput || !getsVal || !cryptoBtns.length) return;

  const formatCoinAmount = (v) => (v >= 1 ? v.toFixed(2) : v.toFixed(7));
  const formatUsd = (v) => `$${v.toFixed(2)}`;
  const getSelectedCryptoBtn = () => cryptoBtns.find((btn) => btn.classList.contains('active')) || cryptoBtns[0];
  const setSelectedCryptoBtn = (targetBtn) => {
    cryptoBtns.forEach((btn) => btn.classList.toggle('active', btn === targetBtn));
  };

  const switchWalletMode = (mode) => {
    const isWithdraw = mode === 'withdraw';
    if (topupView) topupView.style.display = isWithdraw ? 'none' : 'block';
    if (withdrawView) withdrawView.style.display = isWithdraw ? 'block' : 'none';
    if (modeTitle) {
      modeTitle.innerHTML = isWithdraw
        ? '<i data-lucide="send" class="lc-sm ac"></i> Withdraw'
        : '<i data-lucide="plus-circle" class="lc-sm ac"></i> Top Up';
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
  };

  const syncQuickButtons = (amount) => {
    quickBtns.forEach((btn) => {
      const val = Number(btn.dataset.amount || 0);
      const isActive = val === amount;
      btn.classList.toggle('btn-p', isActive);
      btn.classList.toggle('btn-g', !isActive);
    });
  };

  const openDepositModal = () => {
    if (!depositModal) return;
    const selectedBtn = getSelectedCryptoBtn();
    const crypto = selectedBtn.dataset.crypto || 'TRC-20';
    const amount = Math.max(0, Number(amountInput?.value || 0));
    const coinName = crypto === 'ERC-20' ? 'Ethereum' : 'TRON';
    const coinMark = crypto === 'ERC-20' ? 'E' : 'T';
    const symbol = 'USDT';
    if (depositNetworkLabel) depositNetworkLabel.textContent = crypto;
    if (depositNetworkName) depositNetworkName.textContent = coinName;
    if (depositCoinMark) depositCoinMark.textContent = coinMark;
    if (depositWarningText) depositWarningText.textContent = `Only send ${crypto} assets to this address. Other assets will be lost forever.`;
    if (depositExpected) depositExpected.textContent = formatUsd(amount);
    if (depositExpectedCrypto) depositExpectedCrypto.textContent = `${amount.toFixed(2)} ${symbol}`;
    if (depositAddress) {
      depositAddress.textContent = crypto === 'ERC-20'
        ? '0x4a6b2D3f9A0c4c1E8d72A9f17b3DFe91Aa19Ef'
        : 'TXf2mV7k8Jp4a1rN6cB9uL3qW5zY2sDa9K2';
    }
    depositModal.style.display = 'flex';
    lockBodyScroll();
    if (typeof lucide !== 'undefined') lucide.createIcons();
  };

  const closeDepositModal = () => {
    if (!depositModal || depositModal.style.display === 'none') return;
    depositModal.style.display = 'none';
    unlockBodyScroll();
  };

  const updateValues = () => {
    const selectedBtn = getSelectedCryptoBtn();
    const crypto = selectedBtn.dataset.crypto || 'TRC-20';
    const rate = Number(selectedBtn.dataset.rate || 1);
    const topupAmount = Math.max(0, Number(amountInput?.value || 0));
    const withdrawAmount = Math.max(0, Number(withdrawAmountInput?.value || 0));
    const topupCoinAmount = rate > 0 ? (topupAmount / rate) : 0;
    const withdrawCoinAmount = rate > 0 ? (withdrawAmount / rate) : 0;
    const topupNetAmount = topupAmount * 0.9827;
    const withdrawNetAmount = withdrawAmount * 0.9827;
    const withdrawFeeAmount = Math.max(0, withdrawAmount - withdrawNetAmount);
    if (converted) converted.textContent = `~ ${crypto} ${formatCoinAmount(topupCoinAmount)}`;
    if (withdrawConverted) withdrawConverted.textContent = `~ ${crypto} ${formatCoinAmount(withdrawCoinAmount)}`;
    if (getsVal) getsVal.textContent = formatUsd(topupNetAmount);
    if (receiveVal) receiveVal.textContent = formatUsd(withdrawNetAmount);
    if (feeVal) feeVal.textContent = formatUsd(withdrawFeeAmount);
    if (walletAddressNetworkHint) walletAddressNetworkHint.textContent = crypto;
    syncQuickButtons(topupAmount);
  };

  cryptoBtns.forEach((btn) => {
    btn.addEventListener('click', () => { setSelectedCryptoBtn(btn); updateValues(); });
  });
  amountInput?.addEventListener('input', updateValues);
  withdrawAmountInput?.addEventListener('input', updateValues);
  quickBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const amount = Number(btn.dataset.amount || 100);
      if (amountInput) amountInput.value = String(amount);
      updateValues();
    });
  });

  const flashAction = (btn, doneText) => {
    if (!btn) return;
    const original = btn.innerHTML;
    btn.innerHTML = `<i data-lucide="check" class="lc-sm"></i> ${doneText}`;
    btn.disabled = true;
    if (typeof lucide !== 'undefined') lucide.createIcons();
    window.setTimeout(() => {
      btn.innerHTML = original;
      btn.disabled = false;
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }, 1400);
  };

  depositBtn?.addEventListener('click', openDepositModal);
  openWithdrawBtn?.addEventListener('click', () => switchWalletMode('withdraw'));
  backToTopupBtn?.addEventListener('click', () => switchWalletMode('topup'));
  withdrawBtn?.addEventListener('click', () => {
    const walletAddress = (walletAddressInput?.value || '').trim();
    if (!walletAddress) {
      walletAddressInput?.focus();
      walletAddressInput?.classList.add('wallet-addr-input--error');
      window.setTimeout(() => walletAddressInput?.classList.remove('wallet-addr-input--error'), 1200);
      return;
    }
    flashAction(withdrawBtn, 'Withdrawal Started');
  });
  depositModalClose?.addEventListener('click', closeDepositModal);
  depositModalCloseInline?.addEventListener('click', closeDepositModal);
  depositModalCopy?.addEventListener('click', async () => {
    const addressText = (depositAddress?.textContent || '').trim();
    if (!addressText) return;
    try {
      await navigator.clipboard.writeText(addressText);
      flashAction(depositModalCopy, 'Copied');
    } catch {
      flashAction(depositModalCopy, 'Copy Failed');
    }
  });
  depositSetAmountBtn?.addEventListener('click', () => {
    closeDepositModal();
    amountInput?.focus();
  });
  depositShareBtn?.addEventListener('click', async () => {
    const text = `Deposit ${depositExpectedCrypto?.textContent || ''} to ${depositAddress?.textContent || ''}`;
    try {
      if (navigator.share) await navigator.share({ text });
      else await navigator.clipboard.writeText(text);
      flashAction(depositShareBtn, 'Shared');
    } catch {
      flashAction(depositShareBtn, 'Cancelled');
    }
  });
  depositModal?.addEventListener('click', (e) => {
    if (e.target === depositModal) closeDepositModal();
  });
  walletTxWrap?.addEventListener('click', async (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    const copyBtn = target.closest('.wallet-hash-copy');
    if (!copyBtn) return;
    const hash = copyBtn.getAttribute('data-hash') || '';
    if (!hash) return;
    try {
      await navigator.clipboard.writeText(hash);
      const prev = copyBtn.textContent;
      copyBtn.textContent = 'Copied';
      window.setTimeout(() => { copyBtn.textContent = prev || 'Copy'; }, 900);
    } catch {
      const prev = copyBtn.textContent;
      copyBtn.textContent = 'Failed';
      window.setTimeout(() => { copyBtn.textContent = prev || 'Copy'; }, 900);
    }
  });

  document.addEventListener('dropzona:page-change', (e) => {
    if (e?.detail?.pageId === 's-wallet') {
      switchWalletMode('topup');
      closeDepositModal();
    }
  });

  switchWalletMode('topup');
  updateValues();
}

function init() {
  document.querySelectorAll('.bn-i').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const p = el.dataset.p;
      if (p) go(p);
    });
  });
  document.getElementById('menuBtn')?.addEventListener('click', openDrawer);
  document.getElementById('drawerClose')?.addEventListener('click', closeDrawer);
  document.getElementById('overlay')?.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', handleGlobalKeydown);
  installKeyboardWatcher();
  document.querySelectorAll('.drawer-nav .ni[data-p]').forEach(el => {
    el.addEventListener('click', () => { go(el.dataset.p); });
  });
  document.getElementById('rBtnV')?.addEventListener('click', () => setRole('v'));
  document.getElementById('rBtnS')?.addEventListener('click', () => setRole('s'));
  document.querySelector('.drawer-user')?.addEventListener('click', () => {
    go(role === 's' ? 's-profile' : 'profile');
    closeDrawer();
  });

  const filterSel = document.getElementById('viewerStreamFilter');
  if (filterSel && !filterSel.dataset.bound) {
    filterSel.addEventListener('change', () => buildStreams());
    filterSel.dataset.bound = '1';
  }

  buildTicker();
  buildStreams();
  buildFollowing();
  initWalletTopup();
  refreshGsiPreview();
  hydrateUser();

  // Restore saved role preference (streamer vs viewer)
  const savedRole = localStorage.getItem('dropzona_role');
  if (savedRole === 's') setRole('s');

  // Resolve deep-link from desktop redirect (?from=/app/...) so shared
  // desktop URLs land on the correct mobile screen.
  resolveDeepLink();

  const msgs = [
    '<b>AlexPlays</b> — Triple kill on Mirage! Drop activated',
    '<b>xDreamer</b> won <span class="hl">AK-47 | Redline</span> from AlexPlays',
    '<b>NaVi_fan228</b> accepted trade <span class="hl">AWP | Asiimov</span> — $14.20',
    '<b>LunaLive</b> — ACE on Inferno! Drop activated',
    '<b>pro100_gamer</b> won <span class="hl">M4A4 | Desolate Space</span>',
    '<b>steelskin99</b> joined · Twitch ✓ · Trade URL ✓'
  ];
  ['kill', 'drop', 'trade', 'kill', 'drop', 'join'].forEach((t, i) => {
    addFeedEvent(t, msgs[i]);
    addSFeedEvent(t, msgs[i]);
  });
  addSFeedEvent('kill', '<b>Triple kill</b> on Mirage — drop #1047');
  addSFeedEvent('drop', 'Winner: <b>xDreamer</b> → <span class="hl">AK-47 | Redline</span> ($8.40)');
  addSFeedEvent('trade', '✓ Trade #1047 accepted — <b>xDreamer</b>');
  startSim();

  updateBottomNav();
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
