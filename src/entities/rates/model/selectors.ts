import type { RootState } from 'app/providers/StoreProvider';
import { loadRatesFromStorage } from './persist';

export const selectRatesState = (state: RootState) => state.rates;
export const selectRatesData = (state: RootState) => state.rates.data;
export const selectRatesStatus = (state: RootState) => state.rates.status;
export const selectRatesLastUpdated = (state: RootState) => state.rates.lastUpdated;
export const selectRatesError = (state: RootState) => state.rates.error;

export const selectActualRatesData = (state: RootState) => {
  const ratesState = state.rates;

  // Если нет ошибки, возвращаем данные из стейта
  if (ratesState.status !== 'error') {
    return ratesState.data;
  }

  // При ошибке загружаем последние успешные данные из localStorage
  const cachedState = loadRatesFromStorage();
  return cachedState?.data ?? null;
};
