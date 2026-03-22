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
  { id: 10, name: 'TwistPlays', ava: 'TP', game: 'CS2 · Premier · Inferno', viewers: 390, pool: 5, poolVal: 98, triggers: ['shield-check', 'trophy'], live: true, twitch: 'twistplays', totalDrops: 267, totalDroppedVal: 3200, successRate: 95 }
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
  'v-settings': ['Settings', 'Notifications & account'],
  's-dash': ['Dashboard', 'Manage your stream in real time'],
  's-triggers': ['Triggers', 'Configure game event drops'],
  's-pool': ['Skin Pool', 'Inventory for giveaways'],
  's-hist': ['History', 'All drops and payouts'],
  's-health': ['Health', 'System status & errors'],
  's-onboard': ['Setup Wizard', 'Step-by-step onboarding'],
  's-settings': ['Settings', 'API, bot & overlay'],
};

const STREAMER_PAGES = ['s-dash', 's-triggers', 's-pool', 's-health', 's-settings', 's-onboard', 's-hist'];

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

function wizNext() {
  if (wizStep < 4) {
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
    if (wizNextBtn) wizNextBtn.innerHTML = wizStep === 4 ? 'Finish <i data-lucide="check" class="lc-sm"></i>' : 'Next <i data-lucide="arrow-right" class="lc-sm"></i>';
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
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
}

function setRole(r) {
  role = r;
  const roleSl = document.getElementById('roleSl');
  if (roleSl) roleSl.classList.toggle('str', r === 's');
  const rBtnV = document.getElementById('rBtnV');
  const rBtnS = document.getElementById('rBtnS');
  if (rBtnV) rBtnV.classList.toggle('active', r === 'v');
  if (rBtnS) rBtnS.classList.toggle('active', r === 's');
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
  go(r === 'v' ? 'browse' : 's-dash');
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function updateBottomNav() {
  const bn = document.getElementById('bottomNav');
  if (!bn) return;
  const tabs = bn.querySelectorAll('.bn-i');
  const tab0Pages = role === 's' ? STREAMER_PAGES : ['browse', 'stream'];
  const tab1Pages = ['my-drops'];
  const tab2Pages = ['profile', 'v-settings'];
  const groups = [tab0Pages, tab1Pages, tab2Pages];
  tabs.forEach((tab, i) => {
    const pages = groups[i] || [];
    tab.classList.toggle('active', pages.indexOf(curPage) !== -1);
  });
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
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function openDrawer() {
  document.getElementById('overlay')?.classList.add('open');
  document.getElementById('drawer')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  document.getElementById('overlay')?.classList.remove('open');
  document.getElementById('drawer')?.classList.remove('open');
  document.body.style.overflow = '';
}

window.go = go;
window.setRole = setRole;
window.openStream = openStream;
window.wizNext = wizNext;
window.wizPrev = wizPrev;
window.simulateTrigger = simulateTrigger;

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
  document.querySelectorAll('.drawer-nav .ni[data-p]').forEach(el => {
    el.addEventListener('click', () => { go(el.dataset.p); });
  });
  document.getElementById('rBtnV')?.addEventListener('click', () => setRole('v'));
  document.getElementById('rBtnS')?.addEventListener('click', () => setRole('s'));
  document.querySelector('.drawer-user')?.addEventListener('click', () => { go('profile'); closeDrawer(); });

  const filterSel = document.getElementById('viewerStreamFilter');
  if (filterSel && !filterSel.dataset.bound) {
    filterSel.addEventListener('change', () => buildStreams());
    filterSel.dataset.bound = '1';
  }

  buildTicker();
  buildStreams();
  buildFollowing();

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
