import { CLIENTS } from '../../../config/clients';
import { LOGIN, LOGOUT, REGISTER } from './actions';

// Action creators
export function register() {
  return {
    type: REGISTER,
    client: CLIENTS.FIREBASE_AUTH,
    request: {
      method: 'createUserWithEmailAndPassword',
      args: arguments,
    },
  };
}

export function login() {
  return {
    type: LOGIN,
    client: CLIENTS.FIREBASE_AUTH,
    request: {
      method: 'signInWithEmailAndPassword',
      args: arguments,
    },
  };
}

export function logout() {
  return {
    type: LOGOUT,
    client: CLIENTS.FIREBASE_AUTH,
    request: {
      method: 'signOut',
    },
  };
}
