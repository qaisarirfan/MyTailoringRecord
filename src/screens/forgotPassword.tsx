import React from 'react';
import { Box, Heading, ScrollView, VStack, Center, Text } from 'native-base';
import { useDispatch } from 'react-redux';

import ForgotPasswordForm from '../components/forms/forgotPassword';

import { register } from '../redux/reducers/authentication/actionCreators';

export const ForgotPassword = () => {
  const dispatch = useDispatch();

  const onSubmitHandler = ({ email }: { email: string }) => {
    dispatch(register(email));
  };

  return (
    <Box safeArea py="8" style={{ display: 'flex', flex: 1 }}>
      <ScrollView
        keyboardDismissMode="interactive"
        _contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <VStack alignItems="center">
          <Center w="90%">
            <Heading fontSize={36} mb="3">
              Forgot Password
            </Heading>
            <Text>
              Not to worry! Enter email address associated with your account and
              we&rsquo;ll send a link to reset your password.
            </Text>
            <ForgotPasswordForm onSubmit={onSubmitHandler} />
          </Center>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default ForgotPassword;
