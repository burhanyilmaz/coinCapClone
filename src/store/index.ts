import { configureStore } from '@reduxjs/toolkit';
import coins from './coins/reducer';

export const store = configureStore({
  reducer: {
    coins,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
