/**
 * DROPZONE — Tests for state getters/setters.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import state, {
  getDropCounter,
  incrementDropCounter,
  getFeedCount,
  incrementFeedCount,
  getCurrentPageId,
  setCurrentPageId,
  getWizStep,
  setWizStep
} from './state.js';

describe('state', () => {
  beforeEach(() => {
    state.dropCounter = 1050;
    state.feedCount = 0;
    state.currentPageId = 'browse';
    state.wizStep = 1;
  });

  it('incrementDropCounter increments and returns', () => {
    expect(getDropCounter()).toBe(1050);
    expect(incrementDropCounter()).toBe(1051);
    expect(getDropCounter()).toBe(1051);
  });

  it('incrementFeedCount increments and returns', () => {
    expect(getFeedCount()).toBe(0);
    expect(incrementFeedCount()).toBe(1);
    expect(getFeedCount()).toBe(1);
  });

  it('setCurrentPageId / getCurrentPageId', () => {
    expect(getCurrentPageId()).toBe('browse');
    setCurrentPageId('s-dash');
    expect(getCurrentPageId()).toBe('s-dash');
  });

  it('setWizStep / getWizStep', () => {
    expect(getWizStep()).toBe(1);
    setWizStep(3);
    expect(getWizStep()).toBe(3);
  });
});
