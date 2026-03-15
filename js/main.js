/**
 * DROPZONE — Entry point: wire modules, init, expose globals for HTML onclick.
 */

import { STREAMS, TRIGGERS, USERS, SKINS } from './constants.js';
import { go, setRole } from './router.js';
import { addFeedEvent, addSFeedEvent } from './feed.js';
import { buildTicker, buildStreams, buildFollowing, openStream } from './stream.js';
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

  go('browse');

  const seedMsgs = [
    '<b>s1mple</b> — Triple Kill on Mirage! Drop activated',
    '<b>xDreamer</b> won <span class="hl sk-cl">AK-47 | Redline</span> from s1mple',
    '<b>NaVi_fan228</b> accepted trade <span class="hl sk-cv">AWP | Asiimov</span> — $14.20',
    '<b>ZywOo</b> — ACE on Inferno! Drop activated',
    '<b>pro100_gamer</b> won <span class="hl sk-cl">M4A4 | Desolate Space</span>',
    '<b>steelskin99</b> joined · Twitch ✓ · Trade URL ✓'
  ];
  const seedTypes = ['kill', 'drop', 'trade', 'kill', 'drop', 'join'];
  seedTypes.forEach((t, i) => {
    addFeedEvent(t, seedMsgs[i]);
    addSFeedEvent(t, seedMsgs[i]);
  });
  addSFeedEvent('kill', '<b>Triple Kill</b> on Mirage — drop #1047');
  addSFeedEvent('drop', 'Winner: <b>xDreamer</b> → <span class="hl sk-cl">AK-47 | Redline</span> ($8.40)');
  addSFeedEvent('trade', '✓ Trade #1047 accepted — <b>xDreamer</b>');

  startSim();
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
