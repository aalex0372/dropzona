/**
 * DROPZONE — Tests for drop pipeline (idempotency, one drop per eventId).
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { runDropCycle, wasEventProcessed, clearProcessedEvents } from './dropPipeline.js';

const mockStream = { id: 1, name: 's1', game: 'CS2 · Ranked · Mirage', triggers: ['skull'] };
const mockTrigger = { n: 'Triple Kill', ico: 'skull', cls: 'kill' };
const mockData = {
  streams: [mockStream],
  triggers: [mockTrigger],
  users: ['Alice'],
  skins: [{ name: 'AK-47 | Redline', rarity: 'cl' }]
};

describe('runDropCycle', () => {
  beforeEach(() => {
    clearProcessedEvents();
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns a result object on first call', () => {
    const getNextDropId = vi.fn(() => 1);
    const onTrigger = vi.fn();
    const onWinner = vi.fn();
    const onTradeSent = vi.fn();
    const onTradeResolved = vi.fn();

    const result = runDropCycle('evt-1', mockData, {
      getNextDropId,
      onTrigger,
      onWinner,
      onTradeSent,
      onTradeResolved
    });

    expect(result).not.toBeNull();
    expect(result?.dropId).toBe(1);
    expect(result?.trigger).toBe(mockTrigger);
    expect(result?.stream).toBe(mockStream);
    expect(result?.winner).toBe('Alice');
    expect(result?.skin).toBe('AK-47 | Redline');
    expect(typeof result?.price).toBe('string');
    expect(typeof result?.accepted).toBe('boolean');
    expect(getNextDropId).toHaveBeenCalledTimes(1);
    expect(onTrigger).toHaveBeenCalledTimes(1);
  });

  it('returns null when same eventId is used twice (idempotency)', () => {
    const getNextDropId = vi.fn(() => 1);
    const onTrigger = vi.fn();

    const first = runDropCycle('evt-same', mockData, {
      getNextDropId,
      onTrigger,
      onWinner: vi.fn(),
      onTradeSent: vi.fn(),
      onTradeResolved: vi.fn()
    });
    const second = runDropCycle('evt-same', mockData, {
      getNextDropId,
      onTrigger,
      onWinner: vi.fn(),
      onTradeSent: vi.fn(),
      onTradeResolved: vi.fn()
    });

    expect(first).not.toBeNull();
    expect(second).toBeNull();
    expect(getNextDropId).toHaveBeenCalledTimes(1);
    expect(onTrigger).toHaveBeenCalledTimes(1);
  });

  it('calls onWinner after delay', () => {
    const onWinner = vi.fn();
    runDropCycle('evt-2', mockData, {
      getNextDropId: () => 1,
      onTrigger: vi.fn(),
      onWinner,
      onTradeSent: vi.fn(),
      onTradeResolved: vi.fn()
    });
    expect(onWinner).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1200);
    expect(onWinner).toHaveBeenCalledTimes(1);
  });

  it('calls onTradeSent and onTradeResolved after delays', () => {
    const onTradeSent = vi.fn();
    const onTradeResolved = vi.fn();
    runDropCycle('evt-3', mockData, {
      getNextDropId: () => 1,
      onTrigger: vi.fn(),
      onWinner: vi.fn(),
      onTradeSent,
      onTradeResolved
    });
    vi.advanceTimersByTime(2800);
    expect(onTradeSent).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(2500);
    expect(onTradeResolved).toHaveBeenCalledTimes(1);
  });
});

describe('wasEventProcessed', () => {
  beforeEach(clearProcessedEvents);

  it('returns false for new eventId', () => {
    expect(wasEventProcessed('new-id')).toBe(false);
  });

  it('returns true after runDropCycle', () => {
    runDropCycle('processed-id', mockData, {
      getNextDropId: () => 1,
      onTrigger: vi.fn(),
      onWinner: vi.fn(),
      onTradeSent: vi.fn(),
      onTradeResolved: vi.fn()
    });
    expect(wasEventProcessed('processed-id')).toBe(true);
  });
});
