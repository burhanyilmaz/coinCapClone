import React, { memo } from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { coinsSelector } from 'store/coins/selectors';
import CoinCard from 'components/CoinCard';
import { PriceDirection } from 'components/types';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { increaseCoinLimit, selectCoin } from 'store/coins/actions';
import { Screen } from 'navigators/Screens';
import { Coin } from 'store/coins/types';
import { useAppNavigation } from 'hooks/useAppNavigation';

type Props = {
  loading: boolean;
  isSearchResult: boolean;
};

const CoinList = ({ isSearchResult, loading }: Props) => {
  const coins = useSelector(coinsSelector);
  const dispatch = useAppDispatch();
  const { navigate } = useAppNavigation();

  const onPressCoin = (coin: Coin) => {
    dispatch(selectCoin(coin));
    navigate(Screen.COIN_DETAILS);
  };

  const renderItem = ({ item }: { item: Coin }) => (
    <CoinCard
      name={item.name}
      symbol={item.symbol}
      price={item.priceUsd}
      onPress={() => onPressCoin(item)}
      priceDirection={PriceDirection.up}
      dailyPercentage={item.changePercent24Hr}
    />
  );
  const keyExtractor = ({ id }: { id: string }) => id;
  const renderListFooter = () =>
    loading ? <ActivityIndicator style={styles.loading} color={'#10c683'} /> : null;

  return (
    <FlatList
      data={coins}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListFooterComponent={renderListFooter}
      onEndReached={() => !isSearchResult && dispatch(increaseCoinLimit())}
    />
  );
};

const styles = StyleSheet.create({
  loading: {
    marginTop: 16,
  },
});

export default memo(CoinList);
