import React, { FC, memo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { PriceDirection } from './types';

type Props = {
  priceDirection: PriceDirection;
  value: number | string;
};

const Percentage: FC<Props> = ({ priceDirection, value }) => (
  <View style={styles.dailyPercentageContainer}>
    <Icon
      size={12}
      color={priceDirection === PriceDirection.down ? 'red' : '#31b979'}
      name={priceDirection === PriceDirection.down ? 'caret-down' : 'caret-up'}
    />
    <Text
      style={[
        styles.dailyPercentage,
        { color: priceDirection === PriceDirection.down ? 'red' : '#31b979' },
      ]}>
      {value}%
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e2634',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  firstPart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinNameAndSymbol: {
    marginLeft: 16,
  },
  symbol: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  name: {
    fontSize: 14,
    color: 'white',
    opacity: 0.5,
  },
  lastPart: {
    justifyContent: 'flex-end',
  },
  price: {
    fontWeight: '500',
    color: 'white',
  },
  dailyPercentageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  dailyPercentage: {
    color: '#31b979',
    marginLeft: 2,
  },
});

export default memo(Percentage);
