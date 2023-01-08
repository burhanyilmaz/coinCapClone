import { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Text, SafeAreaView } from 'react-native';

const CoinDetails = () => (
  <SafeAreaView style={styles.container}>
    <Text>CoinDetails</Text>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(CoinDetails);
