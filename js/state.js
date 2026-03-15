/**
 * DROPZONE — In-memory app state.
 * Single place for mutable UI state so the drop pipeline and router stay in sync.
 */

/** @type {{ dropCounter: number, feedCount: number, currentPageId: string, role: 'v'|'s', wizStep: number, simInterval: ReturnType<typeof setInterval> | null }} */
const state = {
  dropCounter: 1050,
  feedCount: 0,
  currentPageId: 'browse',
  role: 'v',
  wizStep: 1,
  simInterval: null
};

export default state;

export function getDropCounter() { return state.dropCounter; }
export function incrementDropCounter() { state.dropCounter += 1; return state.dropCounter; }
export function getFeedCount() { return state.feedCount; }
export function incrementFeedCount() { state.feedCount += 1; return state.feedCount; }
export function getCurrentPageId() { return state.currentPageId; }
export function setCurrentPageId(p) { state.currentPageId = p; }
export function getRole() { return state.role; }
export function setRole(r) { state.role = r; }
export function getWizStep() { return state.wizStep; }
export function setWizStep(n) { state.wizStep = n; }
export function getSimInterval() { return state.simInterval; }
export function setSimInterval(v) { state.simInterval = v; }
