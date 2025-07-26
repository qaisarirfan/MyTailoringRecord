import * as React from 'react';
import {FormControl, Input, Button, Link, HStack, Text} from 'native-base';
import {Formik} from 'formik';
import {useSelector} from 'react-redux';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import {loginLoader} from '../../redux/reducers/authentication/selectors';
import {useNavigation} from '@react-navigation/native';

export const SignInForm = ({email, password, onSubmit}) => {
  const loader = useSelector(loginLoader);

  const navigation = useNavigation();

  return (
    <Formik
      initialValues={{
        email,
        password,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
      })}
      onSubmit={onSubmit}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => {
        return (
          <>
            <FormControl isInvalid={errors.email} isRequired>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                type="email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                isReadOnly={loader}
              />
              <FormControl.ErrorMessage _text={{fontSize: 'xs'}}>
                {errors.email}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password} isRequired>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type="password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                isReadOnly={loader}
              />
              <FormControl.ErrorMessage _text={{fontSize: 'xs'}}>
                {errors.password}
              </FormControl.ErrorMessage>
            </FormControl>
            <Link
              _text={{
                fontSize: 'xs',
                fontWeight: '500',
                color: 'indigo.500',
              }}
              alignSelf="flex-end"
              mt="1"
              onPress={() => navigation.navigate('ForgotPassword')}>
              Forget Password?
            </Link>
            <Button
              mt="12"
              colorScheme="indigo"
              onPress={handleSubmit}
              isDisabled={loader}
              isLoading={loader}
              isLoadingText="Submitting">
              Sign in
            </Button>

            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200',
                }}>
                I'm a new user.{' '}
              </Text>
              <Link
                _text={{
                  color: 'indigo.500',
                  fontWeight: 'medium',
                  fontSize: 'sm',
                }}
                onPress={() => navigation.navigate('SignUp')}>
                Sign Up
              </Link>
            </HStack>
          </>
        );
      }}
    </Formik>
  );
};

SignInForm.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  onSubmit: PropTypes.func,
};

SignInForm.defaultProps = {
  email: 'qaisar.irfan.2888@gmail.com',
  password: 'test123abc',
  onSubmit: () => null,
};

export default SignInForm;
