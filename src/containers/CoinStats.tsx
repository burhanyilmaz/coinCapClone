import DataRow from 'components/DataRow';
import { PriceDirection } from 'components/types';
import { memo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import { selectedCoinStatsSelector } from 'store/coins/selectors';

const CoinStats = () => {
  const { stats, customComponentIndex, Percentage, props, customComponentArrayIndex } =
    useSelector(selectedCoinStatsSelector);

  const renderItem = ({ item, index }: { item: string[]; index: number }) => (
    <DataRow
      values={item}
      customComponentIndex={customComponentIndex}
      customComponent={
        customComponentArrayIndex === index && (
          <Percentage
            {...props}
            priceDirection={Number(props.value) < 0 ? PriceDirection.down : PriceDirection.up}
          />
        )
      }
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.statsTitle}>Coin Statistic</Text>
      <FlatList
        data={stats}
        listKey="coinStats"
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  statsTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '700',
    marginBottom: 8,
    marginLeft: 16,
  },
});

export default memo(CoinStats);
