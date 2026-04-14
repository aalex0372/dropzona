/**
 * DROPZONE — Tests for utils (rnd, rndPrice, createEventId, parsePriceFromCard, esc, bold, skinHl, skinSk).
 */

import { describe, it, expect } from 'vitest';
import { rnd, rndPrice, createEventId, parsePriceFromCard, esc, bold, skinHl, skinSk } from './utils.js';

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

describe('esc', () => {
  it('escapes HTML special characters', () => {
    expect(esc('<script>alert("xss")</script>')).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
  });

  it('escapes ampersands', () => {
    expect(esc('a & b')).toBe('a &amp; b');
  });

  it('escapes single quotes', () => {
    expect(esc("it's")).toBe('it&#39;s');
  });

  it('returns same string when no special chars', () => {
    expect(esc('hello world')).toBe('hello world');
  });

  it('coerces non-strings', () => {
    expect(esc(42)).toBe('42');
    expect(esc(null)).toBe('null');
  });
});

describe('bold', () => {
  it('wraps text in <b> with escaping', () => {
    expect(bold('AlexPlays')).toBe('<b>AlexPlays</b>');
  });

  it('escapes HTML in the name', () => {
    expect(bold('<img src=x>')).toBe('<b>&lt;img src=x&gt;</b>');
  });
});

describe('skinHl', () => {
  it('produces highlighted skin span', () => {
    expect(skinHl('AK-47 | Redline', 'cl')).toBe('<span class="hl sk-cl">AK-47 | Redline</span>');
  });

  it('works without rarity', () => {
    expect(skinHl('AK-47 | Redline')).toBe('<span class="hl">AK-47 | Redline</span>');
  });

  it('escapes skin name', () => {
    expect(skinHl('<b>bad</b>', 'cv')).toBe('<span class="hl sk-cv">&lt;b&gt;bad&lt;/b&gt;</span>');
  });
});

describe('skinSk', () => {
  it('produces sk-styled skin span', () => {
    expect(skinSk('AWP | Asiimov', 'cv')).toBe('<span class="sk sk-cv">AWP | Asiimov</span>');
  });

  it('works without rarity', () => {
    expect(skinSk('AWP | Asiimov')).toBe('<span class="sk">AWP | Asiimov</span>');
  });
});
