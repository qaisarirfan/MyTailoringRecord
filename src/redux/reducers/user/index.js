import { createReducer } from '../../../utils/utility';
import { ERROR, LOADED, LOADING } from '../../middleware/actions';
import { LOGOUT } from '../authentication/actions';
import {
  GET_FAVOURITES,
  IMAGE_UPDATE,
  SET_MANAGER_TUTORIAL_SEEN,
  USER,
  USER_UPDATE,
} from './actions';

const initialState = {
  data: null,
  favourites: null,
  isLoading: false,
  loadingError: null,
};

// Reducer
const reducers = {
  [USER + LOADING](state) {
    return {
      ...state,
      isLoading: true,
      loadingError: null,
    };
  },
  [USER + LOADED](state, payload) {
    return {
      ...state,
      isLoading: false,
      loadingError: null,
      data: payload.result,
    };
  },
  [USER + ERROR](state, payload) {
    return {
      ...state,
      isLoading: false,
      loadingError: payload.result,
    };
  },

  [USER_UPDATE + LOADED](state, payload) {
    return {
      ...state,
      isLoading: false,
      loadingError: null,
      data: {
        ...state.data,
        ...payload.result,
      },
    };
  },
  [IMAGE_UPDATE + LOADED](state, payload) {
    return {
      ...state,
      isLoading: false,
      loadingError: null,
      data: payload.result,
    };
  },
  [GET_FAVOURITES + LOADING](state) {
    return { ...state, isLoading: true, loadingError: null };
  },
  [GET_FAVOURITES + LOADED](state, payload) {
    return {
      ...state,
      isLoading: false,
      loadingError: null,
      favourites: payload.result,
    };
  },
  [GET_FAVOURITES + ERROR](state, payload) {
    return { ...state, isLoading: false, loadingError: payload.result };
  },
  [SET_MANAGER_TUTORIAL_SEEN + LOADED](state) {
    return {
      ...state,
      data: {
        ...state.data,
        manager_tutorial_seen: true,
      },
    };
  },

  // Reset reducers
  [LOGOUT + LOADED]() {
    return initialState;
  },
};

export default createReducer(reducers, initialState);
