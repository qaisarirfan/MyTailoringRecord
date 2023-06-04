import get from 'lodash/get';
import {REDUCERS_NAME} from '../../../utils/constants';

const {languages} = REDUCERS_NAME;

export const selectLanguage = state => get(state, `${languages}.language`);
