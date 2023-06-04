import * as React from 'react';
import {FormControl, Input, Button} from 'native-base';
import {Formik} from 'formik';
import {useSelector} from 'react-redux';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import {registerLoader} from '../../redux/reducers/authentication/selectors';

export const SignUpForm = ({
  email,
  password,
  passwordConfirmation,
  onSubmit,
}) => {
  const loader = useSelector(registerLoader);

  return (
    <Formik
      initialValues={{
        email,
        password,
        passwordConfirmation,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
        passwordConfirmation: Yup.string()
          .required('Required')
          .oneOf([Yup.ref('password'), null], 'Passwords must match'),
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
            <FormControl isInvalid={errors.passwordConfirmation} isRequired>
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input
                type="password"
                onChangeText={handleChange('passwordConfirmation')}
                onBlur={handleBlur('passwordConfirmation')}
                value={values.passwordConfirmation}
                isReadOnly={loader}
              />
              <FormControl.ErrorMessage _text={{fontSize: 'xs'}}>
                {errors.passwordConfirmation}
              </FormControl.ErrorMessage>
            </FormControl>
            <Button
              mt="12"
              colorScheme="indigo"
              onPress={handleSubmit}
              isDisabled={loader}
              isLoading={loader}
              isLoadingText="Submitting">
              Sign up
            </Button>
          </>
        );
      }}
    </Formik>
  );
};

SignUpForm.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  passwordConfirmation: PropTypes.string,
  onSubmit: PropTypes.func,
};

SignUpForm.defaultProps = {
  email: 'qaisar.irfan.2888@gmail.com',
  password: 'test123abc',
  passwordConfirmation: 'test123abc',
  onSubmit: () => null,
};

export default SignUpForm;
