import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from 'store';
import { getFormattedPercentageValue, getFormattedCurrencyValue } from 'utils/helper';
import Percentage from 'components/Percentage';
import React from 'react';

type coinsRootState = Pick<RootState, 'coins'>;

export const coinsSelector = (state: coinsRootState) => state.coins.coins;
export const limitSelector = (state: coinsRootState): number => state.coins.limit || 20;
export const subscribeCoinListSelector = (state: coinsRootState): string =>
  state.coins.coins.map(({ id }) => id).join(',');
export const selectedCoinSelector = (state: coinsRootState) => state.coins.selectedCoin;
export const selectedCoinPercentageSelector = createSelector(selectedCoinSelector, selectedCoin =>
  getFormattedPercentageValue(selectedCoin?.changePercent24Hr || 0),
);
export const selectedCoinPriceSelector = createSelector(selectedCoinSelector, selectedCoin =>
  getFormattedCurrencyValue(selectedCoin?.priceUsd || 0),
);
export const selectedCoinStatsSelector = createSelector(selectedCoinSelector, selectedCoin => {
  if (!selectedCoin)
    return { stats: [], customComponentIndex: -1, props: { value: 0 }, Percentage: React.Fragment };
  const properties = {
    rank: 'Rank',
    marketCapUsd: 'Market Cap',
    vwap24Hr: 'VWAP (24Hr)',
    supply: 'Supply',
    volumeUsd24Hr: 'Volume (24Hr)',
    changePercent24Hr: 'Change (24Hr)',
  };

  const rank = [properties.rank, selectedCoin.rank];
  const marketCapUsd = [
    properties.marketCapUsd,
    getFormattedCurrencyValue(Number(selectedCoin.marketCapUsd)),
  ];
  const vwap24Hr = [properties.vwap24Hr, getFormattedCurrencyValue(selectedCoin.vwap24Hr)];
  const supply = [properties.supply, getFormattedCurrencyValue(selectedCoin.supply)];
  const volumeUsd24Hr = [
    properties.volumeUsd24Hr,
    getFormattedCurrencyValue(selectedCoin.volumeUsd24Hr),
  ];
  const changePercent24Hr = [properties.changePercent24Hr, ''];
  const stats = [rank, marketCapUsd, vwap24Hr, supply, volumeUsd24Hr, changePercent24Hr];

  return {
    stats,
    customComponentArrayIndex: 5,
    customComponentIndex: 1,
    props: {
      value: getFormattedPercentageValue(selectedCoin.changePercent24Hr) || 0,
    },
    Percentage,
  };
});
export const coinMarketSelector = (state: coinsRootState) => state.coins.coinMarkets;
export const formattedCoinMarketSelector = createSelector(coinMarketSelector, markets => {
  const formatter = Intl.NumberFormat('en', {
    notation: 'compact',
    style: 'currency',
    currency: 'usd',
  });

  const marketsData = markets.map(market => [
    market.exchangeId,
    `${market.baseSymbol}/${market.quoteSymbol}`,
    formatter.format(Number(market.volumeUsd24Hr))?.toLowerCase(),
  ]);

  return marketsData;
});

export const coinMarketLimitSelector = (state: coinsRootState): number =>
  state.coins.coinMarketLimit || 10;
export const coinHistorySelector = (state: coinsRootState) =>
  state.coins.coinHistory.map(history => Number(history.priceUsd));
