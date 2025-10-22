import type { RootState } from 'app/providers/StoreProvider';

export const selectRatesState = (state: RootState) => state.rates;
export const selectRatesData = (state: RootState) => state.rates.data;
export const selectRatesStatus = (state: RootState) => state.rates.status;
export const selectRatesLastUpdated = (state: RootState) => state.rates.lastUpdated;
export const selectRatesError = (state: RootState) => state.rates.error;


