export type coinsState = {
  coins: (Coin & { priceDirection?: string })[];
  limit: number;
  selectedCoin: Coin | undefined;
  coinMarkets: Market[];
  coinMarketLimit: number;
  coinHistory: CoinHistory[];
};

export interface Coin {
  changePercent24Hr: string;
  explorer: string;
  id: string;
  marketCapUsd: string;
  maxSupply: string;
  name: string;
  priceUsd: string;
  rank: string;
  supply: string;
  symbol: string;
  volumeUsd24Hr: string;
  vwap24Hr: string;
}

export interface Market {
  exchangeId: string;
  baseId: string;
  quoteId: string;
  baseSymbol: string;
  quoteSymbol: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  volumePercent: string;
}

export interface CoinHistory {
  priceUsd: string;
  time: number;
  date: string;
}

export enum HistoryInterval {
  m1 = 'm1',
  m5 = 'm5',
  m15 = 'm15',
  m30 = 'm30',
  h1 = 'h1',
  h2 = 'h2',
  h6 = 'h6',
  h12 = 'h12',
  d1 = 'd1',
}
