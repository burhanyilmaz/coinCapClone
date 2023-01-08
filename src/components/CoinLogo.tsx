import React, { memo } from 'react';
import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';

type Props = {
  coinId: string;
};
const CoinLogo: FC<Props> = ({ coinId }) => (
  <Image
    resizeMode="contain"
    style={styles.image}
    source={{ uri: `https://coinicons-api.vercel.app/api/icon/${coinId.toLowerCase()}` }}
  />
);

const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 50,
  },
});

export default memo(CoinLogo);
