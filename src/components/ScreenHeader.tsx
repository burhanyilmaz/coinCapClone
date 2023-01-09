import React, { FC, memo } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Pressable, Dimensions } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import CoinLogo from './CoinLogo';

type Props = {
  symbol: string;
  name: string;
};

const ScreenHeader: FC<Props> = ({ symbol, name }) => {
  const { goBack } = useNavigation();

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Pressable style={styles.backArea} onPress={goBack}>
          <Icon name="chevron-back" size={24} color="#10c683" />
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <View style={styles.coinInfoContainer}>
          <CoinLogo coinId={symbol} size={24} />
          <Text style={styles.coinName} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.coinSymbol} numberOfLines={1}>
            {symbol?.toUpperCase()}
          </Text>
        </View>
        <View style={styles.plusContainer}>
          <Icon name="add" size={24} color="#10c683" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  backArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: '#10c683',
    fontSize: 16,
  },
  coinInfoContainer: {
    flex: 4,
    maxWidth: (Dimensions.get('screen').width / 6) * 4 - 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinName: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '700',
  },
  coinSymbol: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
    opacity: 0.6,
    fontWeight: '700',
  },
  plusContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

export default memo(ScreenHeader);
