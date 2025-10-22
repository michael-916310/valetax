import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { ratesReducer } from 'entities/rates';
import { loadRatesFromStorage } from 'entities/rates/model/persist';
import { ratesApi } from 'shared/api/ratesApi';
import { listenerMiddleware } from './listener';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialState?: Partial<StateSchema>) {
  const preloaded = { ...initialState } as any;
  const loadedRates = loadRatesFromStorage();
  if (loadedRates) {
    preloaded.rates = loadedRates;
  }

  const rootReducer = combineReducers({
    [ratesApi.reducerPath]: ratesApi.reducer,
    rates: ratesReducer,
  });

  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(ratesApi.middleware, listenerMiddleware.middleware),
    preloadedState: preloaded,
  });

  setupListeners(store.dispatch);
  return store;
}

export const store = createReduxStore();
