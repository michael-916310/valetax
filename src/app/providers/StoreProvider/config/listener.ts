import { createListenerMiddleware } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { ratesApi } from 'shared/api/ratesApi';
import { setFetchMeta, setRates } from 'entities/rates';
import { saveRatesToStorage } from 'entities/rates/model/persist';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: ratesApi.endpoints.getRates.matchFulfilled,
  effect: async (action, api) => {
    const now = new Date().toISOString();
    api.dispatch(setRates(action.payload));
    api.dispatch(setFetchMeta({ lastUpdated: now, status: 'success' }));
    saveRatesToStorage({ data: action.payload, lastUpdated: now, status: 'success' });
  },
});

listenerMiddleware.startListening({
  matcher: ratesApi.endpoints.getRates.matchRejected,
  effect: async (action, api) => {
    const now = new Date().toISOString();
    const err = (action as any)?.error?.message || 'Unknown error';
    api.dispatch(setFetchMeta({ lastUpdated: now, status: 'error', error: err }));
    saveRatesToStorage({ data: null, lastUpdated: now, status: 'error', error: err });
    notification.error({
      message: 'Не удалось получить курсы',
      description: err,
    });
  },
});


