import type { RootState } from 'app/providers/StoreProvider';
import { loadRatesFromStorage } from './persist';

export const selectRatesStatus = (state: RootState) => state.rates.status;

export const selectRatesLastUpdated = (state: RootState) => {
  const ratesState = state.rates;

  if (ratesState.status !== 'error') {
    return ratesState.lastUpdated;
  }

  const cachedState = loadRatesFromStorage();
  return cachedState?.lastUpdated ?? null;
};

export const selectActualRatesData = (state: RootState) => {
  const ratesState = state.rates;

  if (ratesState.status !== 'error') {
    return ratesState.data;
  }

  const cachedState = loadRatesFromStorage();
  return cachedState?.data ?? null;
};
