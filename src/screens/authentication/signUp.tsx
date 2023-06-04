import React from 'react';
import {Box, Heading, ScrollView, VStack, Center} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';

import SignUpForm from '../../components/forms/signUp';

import {register} from '../../redux/reducers/authentication/actionCreators';
import {StyleSheet} from 'react-native';
import {registerError} from '../../redux/reducers/authentication/selectors';

export const SignUp = () => {
  const dispatch = useDispatch();
  const error = useSelector(registerError);

  console.log(error?.result);

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
    <Box safeArea py="8" style={Styles.container}>
      <ScrollView
        keyboardDismissMode="interactive"
        _contentContainerStyle={Styles.scrollView}>
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
              size="xs">
              Sign up to continue!
            </Heading>
            <SignUpForm onSubmit={onSubmitHandler} />
          </Center>
        </VStack>
      </ScrollView>
    </Box>
  );
};

const Styles = StyleSheet.create({
  container: {display: 'flex', flex: 1},
  scrollView: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default SignUp;
