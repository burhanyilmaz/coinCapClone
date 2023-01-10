import { useDynamicColor } from 'hooks/useDynamicColor';
import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Percentage from './Percentage';
import { PriceDirection } from './types';

type Props = {
  percentage: string;
  price: string | number;
  formattedPrice: string;
  priceDirection: PriceDirection;
};

const PriceAndPercentage: FC<Props> = ({ price, percentage, priceDirection, formattedPrice }) => {
  const priceColor = useDynamicColor({
    value: price,
    currentColor: '#fff',
    positiveColor: '#10c683',
    negativeColor: 'red',
  });

  return (
    <View style={styles.container}>
      <Text style={[styles.price, { color: priceColor }]}>{formattedPrice}</Text>
      <Percentage priceDirection={priceDirection} value={percentage} fontSize={16} iconSize={14} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0e1b26',
    width: '100%',
  },
  price: {
    fontSize: 30,
    color: '#fff',
  },
  percentage: {},
});

export default PriceAndPercentage;
