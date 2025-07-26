import React from 'react';
import { Box, Heading, ScrollView, VStack, Center } from 'native-base';
import { useDispatch } from 'react-redux';

import SignUpForm from '../components/forms/signUp';

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
            <Heading size="lg" color="coolGray.800" fontWeight="semibold">
              Welcome
            </Heading>
            <Heading
              mt="1"
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}
              fontWeight="medium"
              size="xs"
            >
              Sign up to continue!
            </Heading>
            <SignUpForm onSubmit={onSubmitHandler} />
          </Center>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default SignUp;
