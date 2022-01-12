import React from 'react';
import { KeyboardAvoidingView } from 'native-base';
import { Platform } from 'react-native';

const KeyboardAvoiding = ({ children }) => {
  return (
    <KeyboardAvoidingView
      h={{ base: '400px', lg: 'auto' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoiding;
