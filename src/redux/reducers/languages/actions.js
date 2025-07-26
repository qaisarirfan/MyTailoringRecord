import {REDUCERS_NAME} from '../../../utils/constants';
import {createActionName} from '../../../utils/utility';

const {languages} = REDUCERS_NAME;

export const SET_LANGUAGE = createActionName(languages, 'SET_LANGUAGE');
