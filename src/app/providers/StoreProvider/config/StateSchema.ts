import { counterReducer } from 'entities/counter';
import type { RatesState } from 'entities/rates';

export interface StateSchema {
  counter: ReturnType<typeof counterReducer>;
  rates: RatesState;
}
