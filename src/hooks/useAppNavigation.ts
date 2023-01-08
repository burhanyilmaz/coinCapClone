import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { MainNavigatorParamList } from 'navigators/MainNavigators';

type NavigationProps = NativeStackNavigationProp<MainNavigatorParamList>;

export const useAppNavigation = () => useNavigation<NavigationProps>();
