/**
 * DROPZONE — Tests for utils (rnd, rndPrice, createEventId, parsePriceFromCard).
 */

import { describe, it, expect } from 'vitest';
import { rnd, rndPrice, createEventId, parsePriceFromCard } from './utils.js';

describe('rnd', () => {
  it('returns an element from the array', () => {
    const arr = [1, 2, 3];
    for (let i = 0; i < 50; i++) {
      const v = rnd(arr);
      expect(arr).toContain(v);
    }
  });

  it('returns the only element for single-element array', () => {
    expect(rnd([42])).toBe(42);
  });
});

describe('rndPrice', () => {
  it('returns a string that parses to a number in range', () => {
    for (let i = 0; i < 20; i++) {
      const s = rndPrice();
      const n = parseFloat(s);
      expect(Number.isNaN(n)).toBe(false);
      expect(n).toBeGreaterThanOrEqual(3);
      expect(n).toBeLessThanOrEqual(53);
    }
  });
});

describe('createEventId', () => {
  it('returns a string', () => {
    expect(typeof createEventId()).toBe('string');
  });

  it('returns unique ids', () => {
    const ids = new Set();
    for (let i = 0; i < 100; i++) ids.add(createEventId());
    expect(ids.size).toBe(100);
  });

  it('starts with sim_', () => {
    expect(createEventId().startsWith('sim_')).toBe(true);
  });
});

describe('parsePriceFromCard', () => {
  it('returns 0 when element has no .sk-p', () => {
    const el = { querySelector: () => null };
    expect(parsePriceFromCard(el)).toBe(0);
  });

  it('parses price from .sk-p textContent', () => {
    const el = {
      querySelector: (sel) => (sel === '.sk-p' ? { textContent: '$12.60' } : null)
    };
    expect(parsePriceFromCard(el)).toBe(12.6);
  });

  it('returns 0 for non-numeric content', () => {
    const el = {
      querySelector: (sel) => (sel === '.sk-p' ? { textContent: 'N/A' } : null)
    };
    expect(parsePriceFromCard(el)).toBe(0);
  });
});
