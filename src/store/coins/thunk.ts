import Api from 'services/api';
import { createAppAsyncThunk } from 'utils/helper';
import { HistoryInterval } from './types';

export const fetchCoins = createAppAsyncThunk(
  'coins/FETCH_COINS',
  async (_, { getState }) => await Api.getCoins({ limit: getState().coins.limit }),
);

export const searchCoins = createAppAsyncThunk(
  'coins/SEARCH_COIN',
  async (text: string) => await Api.searchCoins({ text }),
);

export const fetchCoinMarkets = createAppAsyncThunk(
  'coins/FETCH_COIN_MARKETS',
  async (_, { getState }) =>
    await Api.getCoinMarkets({
      id: getState().coins.selectedCoin?.id,
      limit: getState().coins.coinMarketLimit,
    }),
);

export const fetchCoinHistory = createAppAsyncThunk(
  'coins/FETCH_COIN_HISTORY',
  async (interval: HistoryInterval, { getState }) =>
    await Api.getCoinHistory({
      id: getState().coins.selectedCoin?.id,
      interval,
    }),
);
