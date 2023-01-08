import React, { memo, useState, useEffect, useRef, FC } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import CoinLogo from './CoinLogo';
import { PriceDirection } from './types';

type Props = {
  name: string;
  price: number;
  symbol: string;
  onPress: () => void;
  dailyPercentage: number;
  priceDirection: PriceDirection;
};

const CoinCard: FC<Props> = ({ symbol, name, price, dailyPercentage, priceDirection, onPress }) => {
  const [cardBackgroundColor, setCardBackgroundColor] = useState('#1e2634');
  const currentValue = useRef<number | null>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (currentValue.current !== price && currentValue.current) {
      setCardBackgroundColor('#103b38');
      timeout = setTimeout(() => {
        setCardBackgroundColor('#1e2634');
      }, 300);
    }
    currentValue.current = price;

    return () => clearTimeout(timeout);
  }, [price]);

  return (
    <Pressable
      style={[styles.container, { backgroundColor: cardBackgroundColor }]}
      onPress={onPress}>
      <View style={styles.firstPart}>
        <CoinLogo coinId={symbol} />
        <View style={styles.coinNameAndSymbol}>
          <Text style={styles.symbol}>{symbol?.toUpperCase()}</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>
      <View style={styles.lastPart}>
        <Text style={styles.price}>${price}</Text>
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
            {dailyPercentage}%
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

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

export default memo(CoinCard);
