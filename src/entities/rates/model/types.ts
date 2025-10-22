import type { RatesResponse } from 'shared/api/ratesApi';

export type FetchStatus = 'pending' | 'success' | 'error';

export interface RatesState {
  data: RatesResponse | null;
  lastUpdated: string | null; // ISO string
  status: FetchStatus;
  error?: string;
}
