import React, { FC, memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  isHeader?: boolean;
  values: (string | number)[];
  customComponentIndex?: number;
  customComponent?: React.ReactNode;
};

const DataRow: FC<Props> = ({ values = [], isHeader, customComponent, customComponentIndex }) => (
  <View style={styles.container}>
    {values.map((value, index) => (
      <View key={index} style={index === 0 ? styles.firstValueContainer : styles.valueContainer}>
        {index === customComponentIndex && customComponent ? (
          customComponent
        ) : (
          <Text numberOfLines={1} style={isHeader ? styles.headerText : styles.valueText}>
            {value}
          </Text>
        )}
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    backgroundColor: '#1e2634',
    paddingHorizontal: 16,
    marginBottom: 1,
  },
  valueContainer: {
    flex: 1,
  },
  firstValueContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  valueText: {
    textAlign: 'right',
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
  headerText: {
    textAlign: 'right',
    fontWeight: '800',
    color: '#fff',
  },
});

export default memo(DataRow);
