import React, { FC, memo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { TimePeriod } from './types';

type Props = {
  selectedPeriod?: string;
  onPress: (period: string) => void;
};

const TimePeriods: FC<Props> = ({ selectedPeriod = TimePeriod['h1'], onPress }) => (
  <View style={styles.container}>
    {Object.values(TimePeriod).map((period, index) => (
      <Pressable
        key={Object.keys(TimePeriod)[index]}
        onPress={() => onPress(Object.keys(TimePeriod)[index])}
        style={[
          styles.periodContainer,
          {
            backgroundColor:
              selectedPeriod === Object.keys(TimePeriod)[index] ? '#10c683' : 'transparent',
          },
        ]}>
        <Text
          style={[
            styles.periodText,
            { color: selectedPeriod === Object.keys(TimePeriod)[index] ? '#fff' : '#10c683' },
          ]}>
          {period}
        </Text>
      </Pressable>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#0e1b26',
    justifyContent: 'space-between',
  },
  periodContainer: {
    backgroundColor: '#10c683',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  periodText: {
    fontWeight: '600',
    fontSize: 14,
  },
});

export default memo(TimePeriods);
