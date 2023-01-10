import Api from 'services/api';
import { createAppAsyncThunk } from 'utils/helper';

export const fetchCoins = createAppAsyncThunk(
  'coins/FETCH_COINS',
  async (_, { getState }) => await Api.getCoins({ limit: getState().coins.limit }),
);

export const searchCoins = createAppAsyncThunk(
  'coins/SEARCH_COIN',
  async (text: string) => await Api.searchCoins({ text }),
);
