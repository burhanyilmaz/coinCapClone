import React, { memo, useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { limitSelector, subscribeCoinListSelector } from 'store/coins/selectors';
import Spacer from 'components/core/Spacer';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { fetchCoins, searchCoins } from 'store/coins/thunk';
import { useCoinCapWebSocket } from 'hooks/useWebSocket';
import useDebounce from 'hooks/useDebounce';
import CoinList from 'containers/CoinList';
import CoinsHeader from 'components/CoinsHeader';
import { useIsFocused } from '@react-navigation/native';

const Coins = () => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchResult, setIsSearchResult] = useState(false);
  const isFocusedScreen = useIsFocused();
  const dispatch = useAppDispatch();
  const socket = useCoinCapWebSocket();
  const debouncedSearchTerm = useDebounce(searchTerm, 200);

  const limit = useSelector(limitSelector);
  const subscribeCoinList = useSelector(subscribeCoinListSelector);

  const onSearch = (text: string) => {
    setSearchTerm(text);
    setIsSearchResult(!!text || false);
  };

  useEffect(() => {
    setLoading(true);
    dispatch(fetchCoins())
      .unwrap()
      .finally(() => setLoading(false));
  }, [limit]);

  useEffect(() => {
    if (subscribeCoinList && isFocusedScreen) {
      socket.subscribeCoins(subscribeCoinList);
    }

    if (!isFocusedScreen) {
      socket.close();
    }
  }, [subscribeCoinList, isFocusedScreen]);

  useEffect(() => {
    dispatch(searchCoins(debouncedSearchTerm));
  }, [debouncedSearchTerm]);

  return (
    <SafeAreaView style={styles.safe}>
      <CoinsHeader onSearch={onSearch} />
      <Spacer size={16} />
      <CoinList isSearchResult={isSearchResult} loading={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0d1c26',
  },
});

export default memo(Coins);
