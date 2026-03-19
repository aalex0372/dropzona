/**
 * DROPZONE — Entry point: wire modules, init, expose globals for HTML onclick.
 */

import { STREAMS, TRIGGERS, USERS, SKINS } from './constants.js';
import { go, setRole } from './router.js';
import { addFeedEvent, addSFeedEvent } from './feed.js';
import { buildTicker, buildStreams, buildFollowing, buildFollowingsPage, openStream } from './stream.js';
import { wizNext, wizPrev } from './wizard.js';
import { sortSkinPool } from './skinPool.js';
import { runDropCycle } from './dropPipeline.js';
import { incrementDropCounter, setSimInterval } from './state.js';
import { createEventId } from './utils.js';

/**
 * Run one simulated drop (trigger → winner → trade → accept/expire).
 * Idempotent per eventId; one eventId = one drop.
 */
function simulateTrigger() {
  const eventId = createEventId();
  runDropCycle(eventId, { streams: STREAMS, triggers: TRIGGERS, users: USERS, skins: SKINS }, {
    getNextDropId: incrementDropCounter,
    onTrigger: (viewerMsg, streamerMsg) => {
      addFeedEvent('kill', viewerMsg);
      addSFeedEvent('kill', streamerMsg);
    },
    onWinner: (viewerMsg, streamerMsg) => {
      addFeedEvent('drop', viewerMsg);
      addSFeedEvent('drop', streamerMsg);
    },
    onTradeSent: (streamerMsg) => {
      addSFeedEvent('trade', streamerMsg);
    },
    onTradeResolved: (viewerMsg, streamerMsg, accepted) => {
      if (viewerMsg) addFeedEvent('trade', viewerMsg);
      addSFeedEvent(accepted ? 'trade' : 'fail', streamerMsg);
    }
  });
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

/**
 * Start background sim: random triggers or join messages.
 */
function startSim() {
  const interval = setInterval(() => {
    if (Math.random() > 0.4) simulateTrigger();
    else {
      const u = USERS[Math.floor(Math.random() * USERS.length)];
      addFeedEvent('join', `<b>${u}</b> joined · Twitch ✓ · Trade URL ✓`);
    }
  }, 8000);
  setSimInterval(interval);
}

// Expose for onclick in HTML
window.go = go;
window.setRole = setRole;
window.openStream = openStream;
window.wizNext = wizNext;
window.wizPrev = wizPrev;
window.simulateTrigger = simulateTrigger;
window.sortSkinPool = sortSkinPool;

/**
 * Init: bind nav and role, build UI, seed feed, start sim.
 */
function init() {
  // Language switcher UI (UX only; no real translations)
  const langSelect = document.getElementById('langSelect');
  const hdrLangBtn = document.getElementById('hdrLangBtn');
  const hdrLangPop = document.getElementById('hdrLangPop');
  const hdrLangLabel = document.getElementById('hdrLangLabel');
  const LANG_LABELS = {
    en: 'English',
    ru: 'Русский',
    he: 'עברית',
    ar: 'العربية',
    es: 'Español',
    fr: 'Français',
    am: 'አማርኛ',
  };

  function setHdrLabelFromSelect() {
    if (!hdrLangLabel || !langSelect) return;
    hdrLangLabel.textContent = LANG_LABELS[langSelect.value] || langSelect.value;
  }

  const closePop = () => {
    if (!hdrLangPop || !hdrLangBtn) return;
    hdrLangPop.style.display = 'none';
    hdrLangBtn.setAttribute('aria-expanded', 'false');
  };

  const openPop = () => {
    if (!hdrLangPop || !hdrLangBtn) return;
    hdrLangPop.style.display = 'flex';
    hdrLangBtn.setAttribute('aria-expanded', 'true');
  };

  if (langSelect && !langSelect.dataset.bound) {
    langSelect.value = window.localStorage.getItem('sd_lang') || 'en';
    langSelect.addEventListener('change', () => {
      window.localStorage.setItem('sd_lang', langSelect.value);
      setHdrLabelFromSelect();
    });
    langSelect.dataset.bound = '1';
    setHdrLabelFromSelect();
  } else {
    setHdrLabelFromSelect();
  }

  if (hdrLangBtn && hdrLangPop && !hdrLangPop.dataset.bound) {
    hdrLangPop.dataset.bound = '1';

    hdrLangBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = hdrLangPop.style.display !== 'none' && hdrLangPop.style.display !== '';
      if (isOpen) closePop();
      else openPop();
    });

    hdrLangPop.querySelectorAll('.hdr-lang-item[data-lang]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const lang = btn.getAttribute('data-lang') || 'en';
        if (langSelect) {
          langSelect.value = lang;
          langSelect.dispatchEvent(new window.Event('change', { bubbles: true }));
        }
        closePop();
      });
    });

    document.addEventListener('click', () => closePop());
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePop(); });
  }

  document.querySelectorAll('.ni[data-p]').forEach((el) => {
    el.addEventListener('click', () => go(el.dataset.p));
  });
  document.getElementById('rBtnV')?.addEventListener('click', () => setRole('v'));
  document.getElementById('rBtnS')?.addEventListener('click', () => setRole('s'));
  document.querySelector('.s-user')?.addEventListener('click', () => go('profile'));
  const topAct = document.getElementById('topAct');
  if (topAct && !topAct.onclick) topAct.addEventListener('click', () => setRole('s'));
  document.querySelectorAll('.tb-btn[data-go]').forEach((btn) => {
    btn.addEventListener('click', () => go(btn.dataset.go));
  });

  buildTicker();
  buildStreams();
  buildFollowing();
  buildFollowingsPage();

  go('browse');

  const seedMsgs = [
    '<b>AlexPlays</b> — Triple kill on Mirage! Drop activated',
    '<b>xDreamer</b> won <span class="hl sk-cl">AK-47 | Redline</span> from AlexPlays',
    '<b>NaVi_fan228</b> accepted trade <span class="hl sk-cv">AWP | Asiimov</span> — $14.20',
    '<b>LunaLive</b> — ACE on Inferno! Drop activated',
    '<b>pro100_gamer</b> won <span class="hl sk-cl">M4A4 | Desolate Space</span>',
    '<b>steelskin99</b> joined · Twitch ✓ · Trade URL ✓'
  ];
  const seedTypes = ['kill', 'drop', 'trade', 'kill', 'drop', 'join'];
  seedTypes.forEach((t, i) => {
    addFeedEvent(t, seedMsgs[i]);
    addSFeedEvent(t, seedMsgs[i]);
  });
  addSFeedEvent('kill', '<b>Triple kill</b> on Mirage — drop #1047');
  addSFeedEvent('drop', 'Winner: <b>xDreamer</b> → <span class="hl sk-cl">AK-47 | Redline</span> ($8.40)');
  addSFeedEvent('trade', '✓ Trade #1047 accepted — <b>xDreamer</b>');

  startSim();
  initGridBackground();
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

/**
 * Animated grid background (same as support page): canvas + mouse-reactive dots & lines.
 */
function initGridBackground() {
  const c = document.getElementById('gridCanvas');
  if (!c) return;
  const ctx = c.getContext('2d');
  let w, h, cols, rows;
  const size = 50;
  let mouse = { x: -1000, y: -1000 };
  let pts = [];

  function resize() {
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
    cols = Math.ceil(w / size) + 1;
    rows = Math.ceil(h / size) + 1;
    pts = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        pts.push({
          ox: x * size, oy: y * size,
          x: x * size, y: y * size,
          vx: 0, vy: 0,
          brightness: 0
        });
      }
    }
  }

  window.addEventListener('resize', resize);
  document.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
  document.addEventListener('mouseleave', () => { mouse.x = -1000; mouse.y = -1000; });

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (const p of pts) {
      const dx = mouse.x - p.ox;
      const dy = mouse.y - p.oy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 180;
      if (dist < maxDist) {
        const force = (1 - dist / maxDist) * 12;
        const angle = Math.atan2(dy, dx);
        p.vx += -Math.cos(angle) * force * 0.015;
        p.vy += -Math.sin(angle) * force * 0.015;
        p.brightness = Math.max(p.brightness, (1 - dist / maxDist) * 0.6);
      }
      p.vx += (p.ox - p.x) * 0.04;
      p.vy += (p.oy - p.y) * 0.04;
      p.vx *= 0.85; p.vy *= 0.85;
      p.x += p.vx; p.y += p.vy;
      p.brightness *= 0.95;

      const alpha = 0.03 + p.brightness;
      const r = 1 + p.brightness * 2;
      ctx.fillStyle = `rgba(139,92,246,${alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      const col = i % cols;
      const row = Math.floor(i / cols);
      if (col < cols - 1) {
        const n = pts[i + 1];
        const alpha = 0.015 + Math.max(p.brightness, n.brightness) * 0.15;
        ctx.strokeStyle = `rgba(139,92,246,${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(n.x, n.y); ctx.stroke();
      }
      if (row < rows - 1) {
        const n = pts[i + cols];
        const alpha = 0.015 + Math.max(p.brightness, n.brightness) * 0.15;
        ctx.strokeStyle = `rgba(139,92,246,${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(n.x, n.y); ctx.stroke();
      }
    }
    window.requestAnimationFrame(draw);
  }
  resize();
  draw();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
