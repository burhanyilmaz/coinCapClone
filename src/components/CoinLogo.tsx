import React, { memo } from 'react';
import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';

type Props = {
  coinId: string;
  size?: number;
};

const CoinLogo: FC<Props> = ({ coinId, size = 30 }) => (
  <Image
    resizeMode="contain"
    style={[styles.image, { width: size, height: size }]}
    source={{ uri: `https://coinicons-api.vercel.app/api/icon/${coinId?.toLowerCase()}` }}
  />
);

const styles = StyleSheet.create({
  image: {
    height: 30,
    width: 30,
  },
});

export default memo(CoinLogo);
