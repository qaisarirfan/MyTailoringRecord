import AsyncStorage from '@react-native-async-storage/async-storage';
import createFilter from 'redux-persist-transform-filter';
import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { REDUCERS_NAME } from '../utils/constants';
import { api } from './api';

export const saveAuthFilter = createFilter(REDUCERS_NAME.authentication, [
  'login.data',
]);
export const loadAuthFilter = createFilter(
  REDUCERS_NAME.authentication,
  undefined,
  ['login'],
);

export const saveLangFilter = createFilter(REDUCERS_NAME.languages, [
  'language',
]);
export const loadLangFilter = createFilter(REDUCERS_NAME.languages, undefined, [
  'language',
]);

export const saveNavigationFilter = createFilter(REDUCERS_NAME.navigation, [
  'navigation',
]);
export const loadNavigationFilter = createFilter(
  REDUCERS_NAME.navigation,
  undefined,
  ['navigation'],
);

const storageConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    REDUCERS_NAME.authentication,
    REDUCERS_NAME.firstLoad,
    REDUCERS_NAME.languages,
    REDUCERS_NAME.navigation,
  ],
  transforms: [
    saveAuthFilter,
    loadAuthFilter,
    saveLangFilter,
    loadLangFilter,
    saveNavigationFilter,
    loadNavigationFilter,
  ],
};

const configStore = () => {
  const store = configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(api.middleware),
  });

  return store;
};

export default configStore;
