import React from 'react';
import {Box, Heading, ScrollView, VStack, Center} from 'native-base';
import {useDispatch} from 'react-redux';

import SignInForm from '../../components/forms/signIn';


import { StyleSheet } from 'react-native';

export const SignIn = () => {
  const dispatch = useDispatch();

  const onSubmitHandler = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {};

  return (
    <Box safeArea py="8" style={Styles.container}>
      <ScrollView
        _contentContainerStyle={Styles.scrollView}
        keyboardDismissMode="interactive"
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

const Styles = StyleSheet.create({
  container: { display: 'flex', flex: 1 },
  scrollView: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default SignIn;
