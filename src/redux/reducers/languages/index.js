import {createReducer} from '../../../utils/utility';
import {SET_LANGUAGE} from './actions';

// languages initial state
export const initialState = {
  language: 'en',
};

// languages Reducer
const reducers = {
  [SET_LANGUAGE](state, payload) {
    return {
      ...state,
      language: payload,
    };
  },
};

export default createReducer(reducers, initialState);
