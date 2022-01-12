import { SET_LANGUAGE } from './actions';

export function createLanguageAction(payload) {
  return {
    type: SET_LANGUAGE,
    payload,
  };
}
