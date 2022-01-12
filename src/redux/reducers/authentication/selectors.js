import get from 'lodash/get';
import { REDUCERS_NAME } from '../../../utils/constants';

const { authentication } = REDUCERS_NAME;

export const selectLoginIsLoading = state =>
  get(state, `${authentication}.login.loader`);
export const selectLoginData = state =>
  get(state, `${authentication}.login.data`);
export const selectAuthToken = state =>
  get(state, `${authentication}.login.data.access_token`);
export const selectLoginError = state =>
  get(state, `${authentication}.login.error`);

export const registerLoader = state =>
  get(state, `${authentication}.register.loader`);
export const registerData = state =>
  get(state, `${authentication}.register.data`);
export const registerError = state =>
  get(state, `${authentication}.register.error`);
