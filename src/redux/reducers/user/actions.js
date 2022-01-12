import { REDUCERS_NAME } from '../../../utils/constants';
import { createActionName } from '../../../utils/utility';

const { user } = REDUCERS_NAME;

export const USER = createActionName(user, 'USER');
export const USER_UPDATE = createActionName(user, 'USER_UPDATE');
export const IMAGE_UPDATE = createActionName(user, 'IMAGE_UPDATE');
export const GET_FAVOURITES = createActionName(user, 'GET_FAVOURITES');
export const SET_MANAGER_TUTORIAL_SEEN = createActionName(
  user,
  'SET_TUTORIAL_SEEN',
);
