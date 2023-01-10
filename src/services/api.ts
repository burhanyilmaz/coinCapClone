import wretch from 'wretch';
import { Coin, HistoryInterval, Market } from 'store/coins/types';

const externalApi = wretch('https://api.coincap.io/v2').options({
  credentials: 'include',
  mode: 'cors',
});

class Api {
  static async getCoins({ limit = 20 }: { limit: number }): Promise<Coin[]> {
    return await externalApi.get(`/assets?limit=${limit}`).json(data => data.data || []);
  }

  static async searchCoins({
    limit = 20,
    text,
  }: {
    limit?: number;
    text: string;
  }): Promise<Coin[]> {
    return await externalApi
      .get(`/assets?limit=${limit}&search=${text}`)
      .json(data => data.data || []);
  }

  static async getCoin({ id }: { id: string }): Promise<Coin> {
    return await externalApi.get(`/assets/${id}`).json(data => data.data || {});
  }

  static async getCoinHistory({
    id,
    interval = HistoryInterval.h1,
  }: {
    id: string;
    interval?: HistoryInterval;
  }): Promise<{ price: string; time: number }[]> {
    return await externalApi
      .get(`/assets/${id}/history?interval=${interval}`)
      .json(data => data.data || []);
  }

  static async getCoinMarkets({ id, limit }: { id: string; limit: number }): Promise<Market[]> {
    return await externalApi
      .get(`/assets/${id}/markets?limit=${limit}`)
      .json(data => data.data || []);
  }
}

export default Api;
