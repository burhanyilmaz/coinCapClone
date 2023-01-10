import wretch from 'wretch';
import { Coin, Market } from 'store/coins/types';

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

  static async getCoinHistory({ id }: { id: string }): Promise<{ price: string; time: number }[]> {
    return await externalApi.get(`/assets/${id}/history?interval=d1`).json(data => data.data || []);
  }

  static async getCoinMarkets({ id }: { id: string }): Promise<{ data: Market[] }> {
    return await externalApi.get(`/assets/${id}/markets`).json(data => data.data || []);
  }
}

export default Api;