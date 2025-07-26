import React from 'react';
import { Box, Heading, ScrollView, VStack, Center } from 'native-base';
import { useDispatch } from 'react-redux';

import SignInForm from '../components/forms/signIn';

import { register } from '../redux/reducers/authentication/actionCreators';

export const SignUp = () => {
  const dispatch = useDispatch();

  const onSubmitHandler = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    dispatch(register(email, password));
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
            <Heading
              size="lg"
              fontWeight="600"
              color="coolGray.800"
              _dark={{
                color: 'warmGray.50',
              }}
            >
              Welcome
            </Heading>
            <Heading
              mt="1"
              _dark={{
                color: 'warmGray.200',
              }}
              color="coolGray.600"
              fontWeight="medium"
              size="xs"
            >
              Sign in to continue!
            </Heading>
            <SignInForm onSubmit={onSubmitHandler} />
          </Center>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default SignUp;
