import { memo } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Text } from 'react-native';

const Coins = () => (
  <SafeAreaView style={styles.container}>
    <Text>Coins</Text>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(Coins);
