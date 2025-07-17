import React from 'react';
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
      <Screens />
      {/* </PersistGate> */}
    </Provider>
  );
};

export default App;
