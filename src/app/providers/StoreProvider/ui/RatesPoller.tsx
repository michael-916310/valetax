import { useEffect } from 'react';
import { useGetRatesQuery } from 'shared/api/ratesApi';
import { RATES_POLL_INTERVAL_MS } from 'shared/config/constants';

export const RatesPoller = () => {
  useGetRatesQuery(undefined, {
    pollingInterval: RATES_POLL_INTERVAL_MS,
    refetchOnMountOrArgChange: true,
  });

  return null;
};


