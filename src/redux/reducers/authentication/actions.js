import {REDUCERS_NAME} from '../../../utils/constants';
import {createActionName} from '../../../utils/utility';

const {authentication} = REDUCERS_NAME;

export const LOGIN = createActionName(authentication, 'LOGIN');
export const REGISTER = createActionName(authentication, 'REGISTER');
export const LOGOUT = createActionName(authentication, 'LOGOUT');
