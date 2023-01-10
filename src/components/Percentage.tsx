import React, { FC, memo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { PriceDirection } from './types';

type Props = {
  priceDirection: PriceDirection;
  value: number | string;
  iconSize?: number;
  fontSize?: number;
};

const Percentage: FC<Props> = ({ priceDirection, value, iconSize = 12, fontSize = 12 }) => (
  <View
    style={[
      styles.dailyPercentageContainer,
      { alignItems: priceDirection === PriceDirection.down ? 'flex-end' : 'flex-start' },
    ]}>
    <Icon
      size={iconSize}
      color={priceDirection === PriceDirection.down ? 'red' : '#31b979'}
      name={priceDirection === PriceDirection.down ? 'caret-down' : 'caret-up'}
    />
    <Text
      style={[
        styles.dailyPercentage,
        { color: priceDirection === PriceDirection.down ? 'red' : '#31b979', fontSize },
      ]}>
      {value}%
    </Text>
  </View>
);

const styles = StyleSheet.create({
  dailyPercentageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  dailyPercentage: {
    color: '#31b979',
    marginLeft: 2,
    fontSize: 8,
  },
});

export default memo(Percentage);
