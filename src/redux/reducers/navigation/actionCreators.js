import { SET_NAVIGATION } from './actions';

export function createNavigationAction(payload) {
  return {
    type: SET_NAVIGATION,
    payload,
  };
}
