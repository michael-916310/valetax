import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { ratesApi } from 'shared/api/ratesApi';
import { listenerMiddleware } from './listener';
import { ratesReducer } from 'entities/rates';
import { StateSchema } from './StateSchema';
import { counterReducer } from 'entities/counter';
import { loadRatesFromStorage } from 'entities/rates/model/persist';

export function createReduxStore(initialState?: Partial<StateSchema>) {
  const preloaded = { ...initialState } as any;
  const loadedRates = loadRatesFromStorage();
  if (loadedRates) {
    preloaded.rates = loadedRates;
  }

  const rootReducer = combineReducers({
    counter: counterReducer,
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
