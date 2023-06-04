import get from 'lodash/get';
import {REDUCERS_NAME} from '../../../utils/constants';

const {navigation} = REDUCERS_NAME;

export const selectNavigation = state => get(state, `${navigation}.navigation`);
