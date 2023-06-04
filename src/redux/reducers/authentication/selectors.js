import get from 'lodash/get';
import {createSelector} from 'reselect';
import {REDUCERS_NAME} from '../../../utils/constants';

const {authentication} = REDUCERS_NAME;

export const loginLoader = state =>
  get(state, `${authentication}.login.loader`);
export const loginData = state => get(state, `${authentication}.login.data`);
export const loginError = state => get(state, `${authentication}.login.error`);
export const userData = createSelector(loginData, data => {
  const uid = get(data, 'result.user.uid');
  const email = get(data, 'result.user.email');
  const refreshToken = get(data, 'result.user.refreshToken');
  const displayName = get(data, 'result.user.displayName');
  const photoURL = get(data, 'result.user.photoURL');

  return {
    displayName,
    email,
    photoURL,
    refreshToken,
    uid,
  };
});

export const registerLoader = state =>
  get(state, `${authentication}.register.loader`);
export const registerData = state =>
  get(state, `${authentication}.register.data`);
export const registerError = state =>
  get(state, `${authentication}.register.error`);
