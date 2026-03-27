/**
 * DROPZONE — Shared constants (streams, triggers, users, skins, page meta).
 * Single source of truth for mock data and route labels.
 */

/** @typedef {{ id: number, name: string, ava: string, game: string, viewers: number, pool: number, poolVal: number, triggers: string[], live?: boolean, twitch?: string, totalDrops?: number, totalDroppedVal?: number, successRate?: number }} Stream */
/** @typedef {{ n: string, ico: string, cls: string, min?: number, max?: number }} Trigger */

/** @type {Stream[]} */
export const STREAMS = [
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
  // from "light" → "heavy" (viewer drop value ranges)
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

/** Recent drops per stream (streamId → [{ skin, winner, time }]) for profile social proof */
export const RECENT_DROPS_BY_STREAM = {
  1: [{ skin: 'AK-47 | Redline (FT)', winner: 'xDreamer', time: '2h ago' }, { skin: 'AWP | Asiimov (FT)', winner: 'NaVi_fan228', time: '5h ago' }, { skin: 'M4A4 | Desolate Space (MW)', winner: 'pro100_gamer', time: '8h ago' }, { skin: 'USP-S | Kill Confirmed (MW)', winner: 'steelskin99', time: '12h ago' }, { skin: 'Glock-18 | Fade (FN)', winner: 'kr1stal_', time: '1d ago' }],
  2: [{ skin: 'P250 | Muertos (FN)', winner: 'maxplay_cs', time: '1h ago' }, { skin: 'Nova | Antique (FT)', winner: 'AWP_god', time: '4h ago' }, { skin: 'MAC-10 | Fade (MW)', winner: 'noob_slayer', time: '9h ago' }],
  4: [{ skin: 'Desert Eagle | Blaze (FN)', winner: 'xDreamer', time: '3h ago' }, { skin: 'AWP | Lightning Strike (FT)', winner: 'NaVi_fan228', time: '6h ago' }, { skin: 'M4A1-S | Hyper Beast (FT)', winner: 'pro100_gamer', time: '11h ago' }],
  6: [{ skin: 'AWP | Asiimov (FT)', winner: 'steelskin99', time: '30m ago' }, { skin: 'AK-47 | Redline (FT)', winner: 'kr1stal_', time: '2h ago' }, { skin: 'Clutch 1v3 → M4A4 | Desolate Space', winner: 'maxplay_cs', time: '5h ago' }, { skin: 'Knife Kill → Glock-18 | Fade', winner: 'AWP_god', time: '1d ago' }]
};

/** Streamer names the user follows (some may be offline) */
/** @type {string[]} */
export const FOLLOWING_NAMES = ['AlexPlays', 'LunaLive', 'DonnyG', 'NikoVibes', 'DevLive', 'MonoPlays', 'ShadowAim'];

/** Page id → [title, subtitle] for topbar */
/** @type {Record<string, [string, string]>} */
export const PAGE_META = {
  'browse': ['Live Streams', 'Watch streams — win skins'],
  'followings': ['Followings', 'Streamers you follow'],
  'stream': ['Stream', 'Participate in drops in real time'],
  'my-drops': ['My Drops', 'History of won skins'],
  'profile': ['Profile', 'Account & connections'],
  'v-settings': ['Viewer settings', 'Watching & notifications'],
  's-dash': ['Dashboard', 'Manage your stream in real time'],
  's-wallet': ['Wallet', 'Top up, withdraw, and track transactions'],
  's-triggers': ['Triggers', 'Configure game event drops'],
  's-pool': ['Skin Pool', 'Inventory for giveaways'],
  's-hist': ['History', 'All drops and payouts'],
  's-health': ['Health', 'System status & errors'],
  's-onboard': ['Setup Wizard', 'Step-by-step onboarding'],
  's-settings': ['Streamer settings', 'API, bot & overlay'],
};
