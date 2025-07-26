import React, { StrictMode } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import persistStore from 'redux-persist/lib/persistStore';

import Screens from './src/screens';
import configureStore from './src/redux/configureStore';
import { PaperProvider } from 'react-native-paper';
import {
  SafeAreaInsetsContext,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { NativeModules, Platform, StatusBar } from 'react-native';

const store = configureStore();
const persistor = persistStore(store);

const App: React.FC = () => {
  const { StatusBarManager } = NativeModules;
  const statusBarHeight = StatusBarManager.HEIGHT;

  console.log(statusBarHeight);

  // const headerHeight = useHeaderHeight();
  return (
    <StrictMode>
      <Provider store={store}>
        <PaperProvider settings={{ rippleEffectEnabled: true }}>
          <Screens />
        </PaperProvider>
      </Provider>
    </StrictMode>
  );
};

export default App;
