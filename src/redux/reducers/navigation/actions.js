import { REDUCERS_NAME } from '../../../utils/constants';
import { createActionName } from '../../../utils/utility';

const { navigation } = REDUCERS_NAME;

export const SET_NAVIGATION = createActionName(navigation, 'SET_NAVIGATION');
