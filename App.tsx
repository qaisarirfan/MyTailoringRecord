import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import persistStore from 'redux-persist/lib/persistStore';

import Screens from './src/screens';
import configureStore from './src/redux/configureStore';

const store = configureStore();
const persistor = persistStore(store);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <NativeBaseProvider>
        <Screens />
      </NativeBaseProvider>
      {/* </PersistGate> */}
    </Provider>
  );
};

export default App;
