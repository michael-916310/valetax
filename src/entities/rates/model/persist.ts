import type { RatesState } from './types';

const STORAGE_KEY = 'rates_state_v1';

export function saveRatesToStorage(state: RatesState) {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (e) {}
}

export function loadRatesFromStorage(): RatesState | undefined {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    return JSON.parse(raw) as RatesState;
  } catch (e) {
    return undefined;
  }
}
