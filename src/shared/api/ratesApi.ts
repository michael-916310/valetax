import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface RatesResponse {
  date: string;
  base: string;
  rates: Record<string, number>;
}

export const ratesApi = createApi({
  reducerPath: 'ratesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.vatcomply.com' }),
  endpoints: (builder) => ({
    getRates: builder.query<RatesResponse, void>({
      query: () => '/rates',
    }),
  }),
});

export const { useGetRatesQuery } = ratesApi;


