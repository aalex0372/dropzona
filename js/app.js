/**
 * DROPZONE — Live Skin Drops
 * App router, data, and UI logic.
 */

const STREAMS = [
  { id: 1, name: 's1mple', ava: 'S1', game: 'CS2 · Ranked · Mirage', viewers: 1240, pool: 12, poolVal: 420, triggers: ['skull', 'crown', 'flame'] },
  { id: 2, name: 'ZywOo', ava: 'ZW', game: 'CS2 · FaceIT · Inferno', viewers: 856, pool: 8, poolVal: 210, triggers: ['skull', 'crown', 'swords'] },
  { id: 3, name: 'donk', ava: 'DN', game: 'CS2 · Premier · Dust2', viewers: 245, pool: 5, poolVal: 95, triggers: ['crown', 'flame'] },
  { id: 4, name: 'NiKo', ava: 'NK', game: 'CS2 · Ranked · Nuke', viewers: 920, pool: 10, poolVal: 310, triggers: ['skull', 'crown', 'swords'] },
  { id: 5, name: 'device', ava: 'DV', game: 'CS2 · FaceIT · Overpass', viewers: 780, pool: 9, poolVal: 185, triggers: ['skull', 'flame'] },
  { id: 6, name: 'm0NESY', ava: 'M0', game: 'CS2 · Premier · Ancient', viewers: 1100, pool: 14, poolVal: 520, triggers: ['crown', 'flame', 'swords'] },
  { id: 7, name: 'electronic', ava: 'EL', game: 'CS2 · Ranked · Anubis', viewers: 420, pool: 6, poolVal: 140, triggers: ['skull', 'crown'] },
  { id: 8, name: 'ropz', ava: 'RZ', game: 'CS2 · FaceIT · Vertigo', viewers: 650, pool: 7, poolVal: 220, triggers: ['flame', 'swords'] },
  { id: 9, name: 'Twistzz', ava: 'TZ', game: 'CS2 · Ranked · Mirage', viewers: 580, pool: 8, poolVal: 195, triggers: ['skull', 'crown', 'flame'] },
  { id: 10, name: 'broky', ava: 'BR', game: 'CS2 · Premier · Inferno', viewers: 390, pool: 5, poolVal: 98, triggers: ['crown', 'swords'] }
];
const SKINS = ['AK-47 | Redline', 'AWP | Asiimov', 'M4A4 | Desolate Space', 'USP-S | Kill Confirmed', 'Glock-18 | Fade', 'P250 | Muertos', 'Desert Eagle | Blaze'];
const USERS = ['xDreamer', 'NaVi_fan228', 'pro100_gamer', 'steelskin99', 'kr1stal_', 'maxplay_cs', 'AWP_god', 'noob_slayer'];
const TRIGGERS = [
  { n: 'Triple Kill', ico: 'skull', cls: 'kill' },
  { n: 'ACE', ico: 'crown', cls: 'kill' },
  { n: 'Clutch 1v3', ico: 'flame', cls: 'kill' },
  { n: 'Knife Kill', ico: 'swords', cls: 'kill' }
];

/** Streamer names the user follows (some may be offline) */
const FOLLOWING_NAMES = ['s1mple', 'ZywOo', 'donk', 'NiKo', 'device', 'm0NESY', 'shroud'];

let dropCounter = 1050;
let feedCount = 0;
let role = 'v';
let curPage = 'browse';
let wizStep = 1;
let simInterval;

const PM = {
  'browse': ['Live Streams', 'Watch streams — win skins'],
  'stream': ['Stream', 'Participate in drops in real time'],
  'my-drops': ['My Drops', 'History of won skins'],
  'profile': ['Profile', 'Account & connections'],
  'v-settings': ['Settings', 'Notifications & account'],
  's-dash': ['Dashboard', 'Manage your stream in real time'],
  's-triggers': ['Triggers', 'Configure game event drops'],
  's-pool': ['Skin Pool', 'Inventory for giveaways'],
  's-hist': ['History', 'All drops with state machine'],
  's-health': ['Health', 'System status & errors'],
  's-onboard': ['Setup Wizard', 'Step-by-step onboarding'],
  's-settings': ['Settings', 'API, bot & overlay'],
  's-antifraud': ['Anti-Fraud', 'Abuse protection']
};

function rnd(a) { return a[Math.floor(Math.random() * a.length)]; }
function rndPrice() { return (Math.random() * 50 + 3).toFixed(2); }

function buildTicker() {
  const items = [];
  for (let i = 0; i < 10; i++) {
    items.push(`<span class="ticker-i"><b>${rnd(USERS)}</b> won <span style="color:var(--cy)">${rnd(SKINS)}</span></span><span class="ticker-sep">·</span>`);
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
  const list = STREAMS;
  const countEl = document.getElementById('streamCount');
  if (countEl) countEl.textContent = '(' + list.length + ')';
  el.innerHTML = list.map(s => `
    <div class="str-c" data-stream-id="${s.id}">
      <div class="str-prev"><div class="gv"><i data-lucide="gamepad-2" style="width:80px;height:80px;stroke-width:1"></i></div>
        <div class="str-br"><div class="b-live"><span class="dot"></span> LIVE</div><div class="b-view"><i data-lucide="eye" class="lc-sm"></i> ${s.viewers.toLocaleString()}</div></div>
        <div class="str-pool"><i data-lucide="gift" class="lc-sm"></i> ${s.pool} skins · $${s.poolVal}</div>
      </div>
      <div class="str-meta">
        <div class="str-ava">${s.ava}</div>
        <div style="flex:1"><div class="str-name">${s.name}</div><div class="str-game">${s.game}</div></div>
        <div class="str-triggers">${s.triggers.map(t => `<div class="tr-mini"><i data-lucide="${t}" class="lc-sm"></i></div>`).join('')}</div>
      </div>
    </div>`).join('');
  if (typeof lucide !== 'undefined') lucide.createIcons();
  el.querySelectorAll('.str-c').forEach(card => {
    card.addEventListener('click', () => openStream(parseInt(card.dataset.streamId, 10)));
  });
  buildFollowing();
}

function openStream(id) {
  const s = STREAMS.find(x => x.id === id);
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
    sdTriggers.innerHTML = s.triggers.map(t => {
      const tr = TRIGGERS.find(x => x.ico === t);
      return `<div class="trig-r"><div class="trig-ico" style="background:var(--rd-s);color:var(--rd)"><i data-lucide="${t}" class="lc"></i></div><div class="trig-info"><div class="trig-n">${tr ? tr.n : t}</div></div><span class="st st-on">Active</span></div>`;
    }).join('');
  }
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
  const price = rndPrice();
  dropCounter++;
  addFeedEvent('kill', `<b>${stream.name}</b> — ${trig.n}! Drop activated`);
  addSFeedEvent('kill', `<b>${trig.n}</b> on ${stream.game.split('·')[2] ? stream.game.split('·')[2].trim() : 'map'} — drop #${dropCounter}`);
  setTimeout(() => {
    addFeedEvent('drop', `<b>${user}</b> selected as winner → <span class="sk">${skin}</span>`);
    addSFeedEvent('drop', `Winner: <b>${user}</b> → <span class="hl">${skin}</span> ($${price})`);
  }, 1200);
  setTimeout(() => { addSFeedEvent('trade', `Trade offer #${dropCounter} sent to <b>${user}</b>`); }, 2800);
  setTimeout(() => {
    if (Math.random() > 0.2) {
      addFeedEvent('trade', `<b>${user}</b> accepted trade <span class="hl">${skin}</span>`);
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
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

// Expose for onclick in HTML
window.go = go;
window.setRole = setRole;
window.openStream = openStream;
window.wizNext = wizNext;
window.wizPrev = wizPrev;
window.simulateTrigger = simulateTrigger;

// Init: bind nav and role buttons, then build UI
function init() {
  document.querySelectorAll('.ni[data-p]').forEach(el => {
    el.addEventListener('click', () => go(el.dataset.p));
  });
  document.getElementById('rBtnV')?.addEventListener('click', () => setRole('v'));
  document.getElementById('rBtnS')?.addEventListener('click', () => setRole('s'));
  document.querySelector('.s-user')?.addEventListener('click', () => go('profile'));
  const topAct = document.getElementById('topAct');
  if (topAct && !topAct.onclick) topAct.addEventListener('click', () => setRole('s'));
  document.querySelectorAll('.tb-btn[data-go]').forEach(btn => {
    btn.addEventListener('click', () => go(btn.dataset.go));
  });

  buildTicker();
  buildStreams();
  buildFollowing();

  const msgs = [
    '<b>s1mple</b> — Triple Kill on Mirage! Drop activated',
    '<b>xDreamer</b> won <span class="hl">AK-47 | Redline</span> from s1mple',
    '<b>NaVi_fan228</b> accepted trade <span class="hl">AWP | Asiimov</span> — $14.20',
    '<b>ZywOo</b> — ACE on Inferno! Drop activated',
    '<b>pro100_gamer</b> won <span class="hl">M4A4 | Desolate Space</span>',
    '<b>steelskin99</b> joined · Twitch ✓ · Trade URL ✓'
  ];
  ['kill', 'drop', 'trade', 'kill', 'drop', 'join'].forEach((t, i) => {
    addFeedEvent(t, msgs[i]);
    addSFeedEvent(t, msgs[i]);
  });
  addSFeedEvent('kill', '<b>Triple Kill</b> on Mirage — drop #1047');
  addSFeedEvent('drop', 'Winner: <b>xDreamer</b> → <span class="hl">AK-47 | Redline</span> ($8.40)');
  addSFeedEvent('trade', '✓ Trade #1047 accepted — <b>xDreamer</b>');
  startSim();
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
