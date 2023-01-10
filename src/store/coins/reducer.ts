import { createReducer } from '@reduxjs/toolkit';
import { Coin, coinsState } from './types';
import { fetchCoinHistory, fetchCoinMarkets, fetchCoins, searchCoins } from './thunk';
import {
  increaseCoinLimit,
  increaseCoinMarketLimit,
  resetCoins,
  selectCoin,
  updateCoinPrice,
  updateSelectedCoinPrice,
} from './actions';
import { PriceDirection } from 'components/types';

export const initialState: coinsState = {
  coins: [],
  limit: 20,
  coinMarkets: [],
  coinMarketLimit: 10,
  selectedCoin: undefined,
  coinHistory: [],
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

    .addCase(fetchCoinMarkets.fulfilled, (state, { payload }) => ({
      ...state,
      coinMarkets: payload,
    }))

    .addCase(selectCoin, (state, { payload }) => ({ ...state, selectedCoin: payload }))

    .addCase(increaseCoinMarketLimit, state => ({
      ...state,
      coinMarketLimit: state.coinMarketLimit + 10,
    }))
    .addCase(updateSelectedCoinPrice, (state, { payload }) => {
      const updatedSelectedCoin = { ...state.selectedCoin, priceUsd: payload } as Coin;

      return {
        ...state,
        selectedCoin: updatedSelectedCoin,
      };
    })
    .addCase(fetchCoinHistory.fulfilled, (state, { payload }) => ({
      ...state,
      coinHistory: payload,
    }))
    .addCase(resetCoins, () => initialState);
});

export default coins;
