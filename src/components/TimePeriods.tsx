import React, { FC, memo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { TimePeriod } from './types';

type Props = {
  selectedPeriod: TimePeriod;
  onPress: (period: TimePeriod) => void;
};

const TimePeriods: FC<Props> = ({ selectedPeriod = TimePeriod['1D'], onPress }) => (
  <View style={styles.container}>
    {Object.values(TimePeriod).map(period => (
      <Pressable
        key={period}
        onPress={() => onPress(period)}
        style={[
          styles.periodContainer,
          { backgroundColor: selectedPeriod === period ? '#10c683' : 'transparent' },
        ]}>
        <Text style={styles.periodText}>{period}</Text>
      </Pressable>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  periodContainer: {
    backgroundColor: '#10c683',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  periodText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default memo(TimePeriods);
