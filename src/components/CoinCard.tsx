import React, { memo, useState, useEffect, useRef, FC, useMemo } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import CoinLogo from './CoinLogo';
import { PriceDirection } from './types';
import Percentage from './Percentage';
import { getFormattedPercentageValue, getFormattedPriceValue } from 'utils/helper';

type Props = {
  name: string;
  price: string;
  symbol: string;
  onPress: () => void;
  dailyPercentage: string;
  priceDirection: PriceDirection;
};

const CoinCard: FC<Props> = ({ symbol, name, price, dailyPercentage, priceDirection, onPress }) => {
  const previousPrice = useRef<number | null>(null);
  const [cardBackgroundColor, setCardBackgroundColor] = useState('#1e2634');

  const priceValue = useMemo(() => getFormattedPriceValue(price), [price]);
  const percentageValue = useMemo(
    () => getFormattedPercentageValue(dailyPercentage),
    [dailyPercentage],
  );

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (previousPrice.current !== Number(price) && previousPrice.current) {
      setCardBackgroundColor(Number(price) > previousPrice.current ? '#103b38' : '#46262b');
      timeout = setTimeout(() => {
        setCardBackgroundColor('#1e2634');
      }, 300);
    }
    previousPrice.current = Number(price);

    return () => clearTimeout(timeout);
  }, [Number(price)]);

  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, { backgroundColor: cardBackgroundColor }]}>
      <View style={styles.firstPart}>
        <CoinLogo coinId={symbol} />
        <View style={styles.coinNameAndSymbol}>
          <Text style={styles.symbol}>{symbol?.toUpperCase()}</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>
      <View style={styles.lastPart}>
        <Text style={styles.price}>{priceValue}</Text>
        <Percentage priceDirection={priceDirection} value={percentageValue} />
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
    fontSize: 13,
    color: 'white',
    opacity: 0.5,
  },
  lastPart: {
    justifyContent: 'flex-end',
  },
  price: {
    fontWeight: '500',
    color: 'white',
    textAlign: 'right',
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
