import { createAction } from '@reduxjs/toolkit';
import { Coin } from './types';

export const resetCoins = createAction<void>('coins/RESET_COINS');
export const increaseCoinLimit = createAction<void>('coins/INCREASE_COIN_LIMIT');
export const updateCoinPrice = createAction<{ [id in string]: string }>('coins/UPDATE_COIN_PRICE');
export const selectCoin = createAction<Coin>('coins/SELECT_COIN');
export const increaseCoinMarketLimit = createAction<void>('coins/INCREASE_COIN_MARKET_LIMIT');
export const updateSelectedCoinPrice = createAction<string>('coins/UPDATE_SELECTED_COIN_PRICE');
