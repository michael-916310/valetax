import { counterReducer } from 'entities/counter';

export interface StateSchema {
  counter: ReturnType<typeof counterReducer>;
}

export type RootState = StateSchema;
export type AppDispatch = any;
