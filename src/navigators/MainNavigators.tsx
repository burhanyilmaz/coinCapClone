import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { Screen } from './Screens';
import Coins from 'screens/Coins';
import CoinDetails from 'screens/CoinDetails';

const Stack = createNativeStackNavigator();

export type MainNavigatorParamList = {
  [Screen.COINS]: undefined;
  [Screen.COIN_DETAILS]: undefined;
};

const commonOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const MainNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name={Screen.COINS} component={Coins} options={commonOptions} />
      <Stack.Screen name={Screen.COIN_DETAILS} component={CoinDetails} options={commonOptions} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default MainNavigator;
