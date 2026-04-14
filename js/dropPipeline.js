/**
 * DROPZONE — Drop pipeline: one eventId → one drop cycle.
 * Idempotent: same eventId never creates two drops.
 * Callbacks drive viewer/streamer feed updates (and later can drive real API).
 */

import { rnd, rndPrice, esc, bold, skinHl, skinSk } from './utils.js';

/** @typedef {import('./constants.js').Stream} Stream */
/** @typedef {import('./constants.js').Trigger} Trigger */

/** @typedef {{ dropId: number, trigger: Trigger, stream: Stream, winner: string, skin: string, price: string, accepted: boolean }} DropResult */

/** Processed event ids — one event must not create multiple drops */
const processedEventIds = new Map(); // eventId → timestamp (for TTL cleanup)

/** Max age for processed event ids (10 minutes) */
const EVENT_TTL_MS = 10 * 60 * 1000;
/** Cleanup interval (every 2 minutes) */
const CLEANUP_INTERVAL_MS = 2 * 60 * 1000;

/** Periodically remove stale event ids to prevent unbounded growth */
setInterval(() => {
  const cutoff = Date.now() - EVENT_TTL_MS;
  for (const [id, ts] of processedEventIds) {
    if (ts < cutoff) processedEventIds.delete(id);
  }
}, CLEANUP_INTERVAL_MS);

/**
 * Run a single drop cycle for the given event id (idempotent).
 * Uses timeouts to simulate: trigger → winner → trade sent → accept/expire.
 * @param {string} eventId - Unique id for this event (dedup key)
 * @param {{ streams: Stream[], triggers: Trigger[], users: string[], skins: { name: string, rarity: string }[] }} data
 * @param {{ getNextDropId: () => number, onTrigger: (msg: string, sMsg: string) => void, onWinner: (msg: string, sMsg: string) => void, onTradeSent: (sMsg: string) => void, onTradeResolved: (viewerMsg: string, streamerMsg: string, accepted: boolean) => void }} callbacks
 * @returns {DropResult | null} Drop result, or null if eventId already processed
 */
export function runDropCycle(eventId, data, callbacks) {
  if (processedEventIds.has(eventId)) return null;
  processedEventIds.set(eventId, Date.now());

  const trigger = rnd(data.triggers);
  const stream = rnd(data.streams);
  const winner = rnd(data.users);
  const skin = rnd(data.skins);
  const skinName = skin.name;
  const rarity = skin.rarity || 'cv';
  const price = rndPrice();
  const dropId = callbacks.getNextDropId();

  const mapPart = stream.game.split('·')[2] ? stream.game.split('·')[2].trim() : 'map';

  // Stage 1: trigger fired
  callbacks.onTrigger(
    `${bold(stream.name)} — ${esc(trigger.n)}! Drop activated`,
    `${bold(trigger.n)} on ${esc(mapPart)} — drop #${dropId}`
  );

  // Stage 2: winner selected (simulated delay)
  setTimeout(() => {
    callbacks.onWinner(
      `${bold(winner)} selected as winner → ${skinSk(skinName, rarity)}`,
      `Winner: ${bold(winner)} → ${skinHl(skinName, rarity)} ($${esc(price)})`
    );
  }, 1200);

  // Stage 3: trade sent
  setTimeout(() => {
    callbacks.onTradeSent(`Trade offer #${dropId} sent to ${bold(winner)}`);
  }, 2800);

  // Stage 4: trade resolved (accept or expire)
  const accepted = Math.random() > 0.2;
  setTimeout(() => {
    if (accepted) {
      callbacks.onTradeResolved(
        `${bold(winner)} accepted trade ${skinHl(skinName, rarity)}`,
        `✓ Trade #${dropId} accepted — ${bold(winner)}`,
        true
      );
    } else {
      callbacks.onTradeResolved(
        '',
        `✗ Trade #${dropId} expired — item returned to pool`,
        false
      );
    }
  }, 5000);

  return { dropId, trigger, stream, winner, skin: skinName, price, accepted };
}

/**
 * Check whether an event id was already processed (for tests).
 * @param {string} eventId
 * @returns {boolean}
 */
export function wasEventProcessed(eventId) {
  return processedEventIds.has(eventId);
}

/**
 * Clear processed events (for tests only).
 */
export function clearProcessedEvents() {
  processedEventIds.clear();
}
