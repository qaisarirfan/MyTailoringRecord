import { HIDE_TUTORIAL, LOAD, SHOW_TUTORIAL } from './actions';

export function createLoadAction() {
  return {
    type: LOAD,
  };
}

export function createShowTutorialAction() {
  return {
    type: SHOW_TUTORIAL,
  };
}

export function createHideTutorialAction() {
  return {
    type: HIDE_TUTORIAL,
  };
}
