import get from 'lodash/get';
import {REDUCERS_NAME} from '../../../utils/constants';
const {firstLoad} = REDUCERS_NAME;

export const selectIsFirstLoad = state =>
  get(state, `${firstLoad}.isFirstLoad`);
export const selectShowingTutorial = state =>
  get(state, `${firstLoad}.showingTutorial`);
