import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import persistStore from 'redux-persist/lib/persistStore';

import SignUp from './src/screens/signUp';
import SignIn from './src/screens/signIn';
import ForgotPassword from './src/screens/forgotPassword';

import configureStore from './src/redux/configureStore';

const initialState = {};
const store = configureStore(initialState);
const persistor = persistStore(store);

const App: React.FC = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
