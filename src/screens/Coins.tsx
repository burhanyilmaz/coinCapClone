import { memo } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import { dummyDataSelector } from 'store/coins/selectors';

const Coins = () => {
  const dummy = useSelector(dummyDataSelector);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Coins - {dummy}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(Coins);
