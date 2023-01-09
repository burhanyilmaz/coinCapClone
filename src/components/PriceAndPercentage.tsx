import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Percentage from './Percentage';
import { PriceDirection } from './types';

type Props = {
  price: number;
  percentage: number;
};

const PriceAndPercentage: FC<Props> = ({ price, percentage }) => (
  <View style={styles.container}>
    <Text style={styles.price}>${price}</Text>
    <Percentage
      priceDirection={PriceDirection.down}
      value={percentage}
      fontSize={16}
      iconSize={14}
    />
  </View>
);

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
