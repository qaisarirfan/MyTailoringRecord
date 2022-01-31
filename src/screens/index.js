import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import SignUp from './authentication/signUp';
import SignIn from './authentication/signIn';
import ForgotPassword from './authentication/forgotPassword';

import Dashboard from './secure/dashboard';

import { userData } from '../redux/reducers/authentication/selectors';

export default () => {
  const { uid } = useSelector(userData);
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      {!uid ? (
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{
              animationTypeForReplace: !uid ? 'pop' : 'push',
            }}
          />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
