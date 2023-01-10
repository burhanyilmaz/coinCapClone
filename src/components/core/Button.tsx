import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator } from 'react-native';

type CustomButtonProps = {
  title?: string;
  icon?: React.ReactNode;
  bgColor?: string;
  textColor?: string;
  onPress: () => void;
  radius?: number;
  loading?: boolean;
};

const CustomButton = ({
  title,
  onPress,
  icon,
  radius = 8,
  bgColor = '#1e2634',
  textColor = 'white',
  loading = false,
}: CustomButtonProps) => (
  <Pressable
    onPress={onPress}
    style={[styles.container, { backgroundColor: bgColor, borderRadius: radius }]}>
    {!!icon && !loading && icon}
    {!!title && !loading && <Text style={[styles.title, { color: textColor }]}>{title}</Text>}
    {loading && <ActivityIndicator color={'#10c683'} />}
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    paddingVertical: 0,
    borderRadius: 8,
    height: 44,
  },
  title: {
    color: 'white',
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
});

export default CustomButton;
