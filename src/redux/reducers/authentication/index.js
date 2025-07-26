import { createReducer } from '../../../utils/utility';
import { ERROR, LOADED, LOADING } from '../../middleware/actions';
import { LOGIN, LOGOUT, REGISTER } from './actions';

const initialState = {
  login: {
    data: null,
    error: null,
    loader: false,
  },
  register: {
    data: null,
    error: null,
    loader: false,
  },
};

// Reducer
const reducers = {
  [REGISTER + LOADING](state) {
    return {
      ...state,
      register: {
        ...state.register,
        data: null,
        error: null,
        loader: true,
      },
    };
  },

  [REGISTER + LOADED](state, payload) {
    return {
      ...state,
      register: {
        ...state.register,
        data: payload,
        loader: false,
      },
    };
  },

  [REGISTER + ERROR](state, payload) {
    return {
      ...state,
      register: {
        ...state.register,
        data: null,
        loader: false,
        error: payload,
      },
    };
  },

  [LOGIN + LOADING](state) {
    return {
      ...state,
      login: {
        ...state.login,
        data: null,
        error: null,
        loader: true,
      },
    };
  },

  [LOGIN + LOADED](state, payload) {
    return {
      ...state,
      login: {
        ...state.login,
        data: payload,
        loader: false,
      },
    };
  },

  [LOGIN + ERROR](state, payload) {
    return {
      ...state,
      login: {
        ...state.login,
        data: null,
        loader: false,
        error: payload,
      },
    };
  },

  [LOGOUT]() {
    return initialState;
  },

  [LOGOUT + LOADED]() {
    return initialState;
  },
};

export default createReducer(reducers, initialState);
