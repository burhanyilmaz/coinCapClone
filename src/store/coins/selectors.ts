import type { RootState } from 'store';

type coinsRootState = Pick<RootState, 'coins'>;

export const coinsSelector = (state: coinsRootState) => state.coins.coins;
export const limitSelector = (state: coinsRootState): number => state.coins.limit || 20;
export const subscribeCoinListSelector = (state: coinsRootState): string =>
  state.coins.coins.map(({ id }) => id).join(',');
export const selectedCoinSelector = (state: coinsRootState) => state.coins.selectedCoin;
