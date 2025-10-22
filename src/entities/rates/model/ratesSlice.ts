import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RatesResponse } from 'shared/api/ratesApi';
import type { RatesState, FetchStatus } from './types';

const initialState: RatesState = {
  data: null,
  lastUpdated: null,
  status: 'idle',
  error: undefined,
};

const slice = createSlice({
  name: 'rates',
  initialState,
  reducers: {
    setRates(state, action: PayloadAction<RatesResponse | null>) {
      state.data = action.payload;
    },
    setFetchMeta(
      state,
      action: PayloadAction<{ lastUpdated: string; status: FetchStatus; error?: string }>,
    ) {
      state.lastUpdated = action.payload.lastUpdated;
      state.status = action.payload.status;
      state.error = action.payload.error;
    },
  },
});

export const { setRates, setFetchMeta } = slice.actions;
export const ratesReducer = slice.reducer;


