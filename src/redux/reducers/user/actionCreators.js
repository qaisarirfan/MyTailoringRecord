import {
  IMAGE_UPDATE,
  USER,
  USER_UPDATE,
  GET_FAVOURITES,
  SET_MANAGER_TUTORIAL_SEEN,
} from './actions';
import { selectPolicyData } from './selectors';

export function createLoadUserAction(courseId) {
  return {
    type: USER,
    request: {
      method: 'get',
      url: `courses/${courseId}/profile`,
    },
  };
}

export function createUpdateUserAction(courseId, data) {
  return {
    type: USER_UPDATE,
    request: {
      method: 'post',
      url: `courses/${courseId}/profile`,
      data,
    },
  };
}

export function createAcceptPolicyAction() {
  return (dispatch, getState) => {
    const state = getState();
    const { requiredPolicy } = selectPolicyData(state);

    const data = {
      policy_version_accepted: requiredPolicy,
    };

    return dispatch(createUpdateUserAction(1, data));
  };
}

export function createUpdateImageAction(courseId, data) {
  return {
    type: IMAGE_UPDATE,
    request: {
      method: 'post',
      url: `courses/${courseId}/profile`,
      data,
    },
  };
}

export function createGetFavouritesAction(courseId, searchTerm) {
  const url = searchTerm
    ? `courses/${courseId}/favorites?search=${searchTerm}`
    : `courses/${courseId}/favorites`;

  return {
    type: GET_FAVOURITES,
    request: {
      method: 'get',
      url,
    },
  };
}

export function createSetManagerTutorialSeenAction() {
  return {
    type: SET_MANAGER_TUTORIAL_SEEN,
    request: {
      method: 'post',
      url: 'manager/tutorial',
      data: { tutorial_seen: true },
    },
  };
}
