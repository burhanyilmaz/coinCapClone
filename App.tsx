import 'intl';
import 'intl/locale-data/jsonp/en';
import { store } from 'store';
import { Provider } from 'react-redux';
import MainNavigator from 'navigators/MainNavigators';

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
