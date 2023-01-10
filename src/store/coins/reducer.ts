import { createReducer } from '@reduxjs/toolkit';
import { coinsState } from './types';
import { fetchCoins, searchCoins } from './thunk';
import { increaseCoinLimit, resetCoins, selectCoin, updateCoinPrice } from './actions';
import { PriceDirection } from 'components/types';

export const initialState: coinsState = {
  coins: [],
  limit: 20,
  selectedCoin: undefined,
};

const coins = createReducer(initialState, builder => {
  builder
    .addCase(fetchCoins.fulfilled, (state, { payload }) => ({ ...state, coins: payload }))
    .addCase(searchCoins.fulfilled, (state, { payload }) => ({ ...state, coins: payload }))
    .addCase(increaseCoinLimit, state => ({ ...state, limit: state.limit + 10 }))
    .addCase(updateCoinPrice, (state, { payload }) => {
      const updatedCoins = state.coins.map(coin => ({
        ...coin,
        priceUsd: payload[coin.id] || coin.priceUsd,
        priceDirection: coin.priceUsd > payload[coin.id] ? PriceDirection.down : PriceDirection.up,
      }));

      return { ...state, coins: updatedCoins };
    })
    .addCase(selectCoin, (state, { payload }) => ({ ...state, selectedCoin: payload }))
    .addCase(resetCoins, () => initialState);
});

export default coins;
