export type coinsState = {
  coins: (Coin & { priceDirection?: string })[];
  limit: number;
  selectedCoin: Coin | undefined;
  coinMarkets: Market[];
  coinMarketLimit: number;
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
