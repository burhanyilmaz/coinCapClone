import DataRow from 'components/DataRow';
import { memo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import { formattedCoinMarketSelector } from 'store/coins/selectors';

const CoinMarkets = () => {
  const markets = useSelector(formattedCoinMarketSelector);

  const renderItem = ({ item }: { item: string[] }) => <DataRow values={item} />;

  return (
    <View style={styles.container}>
      <Text style={styles.statsTitle}>Available Markets</Text>
      <FlatList
        data={markets}
        listKey="coinMarket"
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

export default memo(CoinMarkets);
