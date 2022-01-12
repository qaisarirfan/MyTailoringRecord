import { CLIENTS } from '../../../configure/clients';
import { LOGIN, LOGOUT, REGISTER } from './actions';

// Action creators
export function register() {
  return {
    type: REGISTER,
    client: CLIENTS.FIREBASE_AUTH,
    request: {
      method: 'createUserWithEmailAndPassword',
      arguments,
    },
  };
}

export function login() {
  return {
    type: LOGIN,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
