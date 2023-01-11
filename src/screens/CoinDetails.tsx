import { memo, useEffect, useRef, useState } from 'react';
import Chart from 'components/Chart';
import CoinStats from 'containers/CoinStats';
import Spacer from 'components/core/Spacer';
import PriceAndPercentage from 'components/PriceAndPercentage';
import ScreenHeader from 'components/ScreenHeader';
import TimePeriods from 'components/TimePeriods';
import { StyleSheet, SafeAreaView, FlatList, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import {
  coinHistorySelector,
  coinMarketLimitSelector,
  selectedCoinPercentageSelector,
  selectedCoinPriceSelector,
  selectedCoinSelector,
} from 'store/coins/selectors';
import { PriceDirection } from 'components/types';
import CoinMarkets from 'containers/CoinMarkets';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { fetchCoinHistory, fetchCoinMarkets } from 'store/coins/thunk';
import CustomButton from 'components/core/Button';
import { increaseCoinMarketLimit } from 'store/coins/actions';
import { useCoinCapWebSocket } from 'hooks/useWebSocket';
import { HistoryInterval } from 'store/coins/types';

const CoinDetails = () => {
  const dispatch = useAppDispatch();
  const flatListRef = useRef<FlatList>(null);
  const socket = useCoinCapWebSocket();
  const [marketLoading, setMarketLoading] = useState(false);
  const [historyInterval, setHistoryInterval] = useState<HistoryInterval>(HistoryInterval.h1);

  const coin = useSelector(selectedCoinSelector);
  const coinHistory = useSelector(coinHistorySelector);
  const percentage = useSelector(selectedCoinPercentageSelector);
  const formattedPrice = useSelector(selectedCoinPriceSelector);
  const coinMarketLimit = useSelector(coinMarketLimitSelector);

  const onPressLoadMore = () => {
    dispatch(increaseCoinMarketLimit());
  };
  const onPressBackToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0 });
  };
  const onPressTimePeriod = (interval: HistoryInterval) => {
    setHistoryInterval(interval);
  };

  useEffect(() => {
    setMarketLoading(true);
    dispatch(fetchCoinMarkets())
      .unwrap()
      .finally(() => {
        setMarketLoading(false);
      });
  }, [coinMarketLimit]);

  useEffect(() => {
    if (coin?.id) {
      socket.subscribeCoin(coin.id);
    }

    return () => socket.close();
  }, []);

  useEffect(() => {
    dispatch(fetchCoinHistory(historyInterval));
  }, [historyInterval]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[]}
        ref={flatListRef}
        renderItem={null}
        listKey="coinDetails"
        style={styles.listContainer}
        ListHeaderComponent={<ScreenHeader symbol={coin?.symbol} name={coin?.name} />}
        ListEmptyComponent={
          <>
            <PriceAndPercentage
              percentage={percentage}
              price={coin?.priceUsd || 0}
              formattedPrice={formattedPrice}
              priceDirection={Number(percentage) < 0 ? PriceDirection.down : PriceDirection.up}
            />
            <Chart data={coinHistory} />
            <TimePeriods onPress={onPressTimePeriod} selectedPeriod={historyInterval} />
            <Spacer size={16} />
            <CoinStats />
            <Spacer size={16} />
            <CoinMarkets />
            <Spacer size={3} />
          </>
        }
        ListFooterComponent={
          <>
            <CustomButton
              title="Load More"
              textColor="#10c683"
              radius={0}
              onPress={onPressLoadMore}
              loading={marketLoading}
            />
            <CustomButton
              title="Back To Top"
              textColor="#10c683"
              bgColor="transparent"
              onPress={onPressBackToTop}
            />
          </>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1c26',
  },
  listContainer: {
    paddingTop: Platform.select({ android: 24 })
  },
  statisticText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '700',
  },
});

export default memo(CoinDetails);
