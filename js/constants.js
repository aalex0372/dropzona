/**
 * DROPZONE — Shared constants (streams, triggers, users, skins, page meta).
 * Single source of truth for mock data and route labels.
 */

/** @typedef {{ id: number, name: string, ava: string, game: string, viewers: number, pool: number, poolVal: number, triggers: string[] }} Stream */
/** @typedef {{ n: string, ico: string, cls: string }} Trigger */

/** @type {Stream[]} */
export const STREAMS = [
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

/** Rarity: ms = Mil-Spec, rs = Restricted, cl = Classified, cv = Covert, gd = Extraordinary */
/** @type {{ name: string, rarity: 'ms'|'rs'|'cl'|'cv'|'gd' }[]} */
export const SKINS = [
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

/** @type {string[]} */
export const USERS = ['xDreamer', 'NaVi_fan228', 'pro100_gamer', 'steelskin99', 'kr1stal_', 'maxplay_cs', 'AWP_god', 'noob_slayer'];

/** @type {Trigger[]} */
export const TRIGGERS = [
  { n: 'Triple Kill', ico: 'skull', cls: 'kill' },
  { n: 'ACE', ico: 'crown', cls: 'kill' },
  { n: 'Clutch 1v3', ico: 'flame', cls: 'kill' },
  { n: 'Knife Kill', ico: 'swords', cls: 'kill' }
];

/** Streamer names the user follows (some may be offline) */
/** @type {string[]} */
export const FOLLOWING_NAMES = ['s1mple', 'ZywOo', 'donk', 'NiKo', 'device', 'm0NESY', 'shroud'];

/** Page id → [title, subtitle] for topbar */
/** @type {Record<string, [string, string]>} */
export const PAGE_META = {
  'browse': ['Live Streams', 'Watch streams — win skins'],
  'stream': ['Stream', 'Participate in drops in real time'],
  'my-drops': ['My Drops', 'History of won skins'],
  'profile': ['Profile', 'Account & connections'],
  'v-settings': ['Viewer settings', 'Watching & notifications'],
  's-dash': ['Dashboard', 'Manage your stream in real time'],
  's-triggers': ['Triggers', 'Configure game event drops'],
  's-pool': ['Skin Pool', 'Inventory for giveaways'],
  's-hist': ['History', 'All drops with state machine'],
  's-health': ['Health', 'System status & errors'],
  's-onboard': ['Setup Wizard', 'Step-by-step onboarding'],
  's-settings': ['Streamer settings', 'API, bot & overlay'],
  's-antifraud': ['Anti-Fraud', 'Abuse protection']
};
