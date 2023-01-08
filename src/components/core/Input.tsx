import React, { FC, memo } from 'react';
import { StyleSheet, TextInputProps } from 'react-native';
import { View, TextInput } from 'react-native';

type Props = {
  iconComp: React.ReactNode;
};

const Input: FC<Props & TextInputProps> = ({ iconComp, ...rest }) => (
  <View style={styles.container}>
    {!!iconComp && <View style={styles.iconArea}>{iconComp}</View>}
    <TextInput style={styles.input} {...rest} placeholderTextColor="#6a7078" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 48,
    borderWidth: 2,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: '#1e4845',
    justifyContent: 'center',
    backgroundColor: '#1e2634',
  },
  input: {
    height: 48,
    width: '100%',
    color: '#fff',
    paddingHorizontal: 48,
    fontSize: 16,
  },
  iconArea: {
    height: '100%',
    paddingLeft: 16,
    position: 'absolute',
    justifyContent: 'center',
  },
});

export default memo(Input);
