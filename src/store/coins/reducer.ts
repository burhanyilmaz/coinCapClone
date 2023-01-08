import { createReducer } from '@reduxjs/toolkit';
import { resetCoins } from './actions';
import { coinsState } from './types';

export const initialState: coinsState = {
  dummy: 'Dummy value',
};

const coins = createReducer(initialState, builder => builder.addCase(resetCoins, () => initialState));

export default coins;
