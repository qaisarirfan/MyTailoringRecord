import { REDUCERS_NAME } from '../../../utils/constants';
import { createActionName } from '../../../utils/utility';

const { firstLoad } = REDUCERS_NAME;

// Actions
export const LOAD = createActionName(firstLoad, 'LOAD');
export const SHOW_TUTORIAL = createActionName(firstLoad, 'SHOW_TUTORIAL');
export const HIDE_TUTORIAL = createActionName(firstLoad, 'HIDE_TUTORIAL');
