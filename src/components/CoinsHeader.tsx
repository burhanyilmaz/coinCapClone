import Input from 'components/core/Input';
import React, { memo, FC } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Icon from '@expo/vector-icons/Octicons';
import CustomButton from 'components/core/Button';
import Spacer from 'components/core/Spacer';
import { StatusBar } from 'expo-status-bar';

type Props = {
  onSearch: (text: string) => void;
};

const CoinsHeader: FC<Props> = ({ onSearch }) => {
  const onOpenSortBy = () => {};
  const onReverse = () => {};

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Spacer size={8} />
      <View style={styles.headerContainer}>
        <Input
          placeholder="Search"
          onChangeText={onSearch}
          iconComp={<Icon name="search" size={24} color="#8c9097" />}
        />
        <Spacer size={10} horizontal />
        <CustomButton title="Sort by" textColor="#8c9097" onPress={onOpenSortBy} />
        <Spacer size={10} horizontal />
        <CustomButton
          icon={<Icon name="sort-desc" size={16} color="#8c9097" />}
          onPress={onReverse}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: '#0d1c26',
    paddingTop: Platform.select({ android: 24 })
  },
  headerContainer: {
    backgroundColor: '#0d1c26',
    flexDirection: 'row',
  },
});

export default memo(CoinsHeader);
