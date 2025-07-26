import { createReducer } from '../../../utils/utility';
import { SET_NAVIGATION } from './actions';

// navigation initial state
export const initialState = {
  navigation: null,
};

// navigation Reducer
const reducers = {
  [SET_NAVIGATION](state, payload) {
    return {
      ...state,
      navigation: payload,
    };
  },
};

export default createReducer(reducers, initialState);
