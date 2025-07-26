import {createReducer} from '../../../utils/utility';
import {LOGOUT} from '../authentication/actions';
import {LOADED} from '../../middleware/actions';
import {HIDE_TUTORIAL, LOAD, SHOW_TUTORIAL} from './actions';

// Required variables
const initialState = {
  isFirstLoad: true,
  showingTutorial: false,
};

// Reducer
const reducers = {
  [LOAD](state) {
    return {
      ...state,
      isFirstLoad: false,
    };
  },
  [SHOW_TUTORIAL](state) {
    return {
      ...state,
      showingTutorial: true,
    };
  },
  [HIDE_TUTORIAL](state) {
    return {
      ...state,
      showingTutorial: false,
    };
  },

  // Reset reducers
  [LOGOUT + LOADED]() {
    return initialState;
  },
};

export default createReducer(reducers, initialState);
