import { applyMiddleware, compose, createStore } from 'redux';
import { logger } from 'redux-logger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createFilter from 'redux-persist-transform-filter';
import persistCombineReducers from 'redux-persist/lib/persistCombineReducers';
import thunk from 'redux-thunk';

import ReducerRegistry from './ReducerRegistry';
import createApiClient from './middleware/apiClients';

import authReducer from './reducers/authentication';
import firstLoadReducer from './reducers/firstLoad';
import userReducer from './reducers/user';
import languagesReducer from './reducers/languages';
import navigationReducer from './reducers/navigation';

import { REDUCERS_NAME } from '../utils/constants';

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

const configureStore = (initialState = {}) => {
  AsyncStorage.getAllKeys(console.log);
  // Add default reducers
  ReducerRegistry.register(REDUCERS_NAME.authentication, authReducer);
  ReducerRegistry.register(REDUCERS_NAME.firstLoad, firstLoadReducer);
  ReducerRegistry.register(REDUCERS_NAME.user, userReducer);
  ReducerRegistry.register(REDUCERS_NAME.languages, languagesReducer);
  ReducerRegistry.register(REDUCERS_NAME.navigation, navigationReducer);

  const reducers = persistCombineReducers(
    storageConfig,
    ReducerRegistry.getReducers(),
  );

  const composeEnhancers = compose;

  const middleware = composeEnhancers(
    applyMiddleware(thunk, createApiClient(), logger),
  );

  const store = createStore(reducers, initialState, middleware);

  return store;
};

export default configureStore;
