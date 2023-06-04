import get from 'lodash/get';
import {REDUCERS_NAME} from '../../../utils/constants';

const {user} = REDUCERS_NAME;

export const selectUser = state => get(state, `${user}.data`);
export const selectIsLoading = state => get(state, `${user}.isLoading`);
export const selectLoadingError = state => get(state, `${user}.loadingError`);
export const selectPolicyData = state => ({
  policyLink: get(state, `${user}.data.policy_link`),
  policyVersionAccepted: get(state, `${user}.data.policy_version_accepted`),
  requiredPolicy: get(state, `${user}.data.required_policy`),
});
export const selectFavourites = state => {
  const favourites = get(state, `${user}.favourites`);
  const convertedFavourites = [];

  if (favourites) {
    favourites.map(favourite =>
      favourite.pages
        ? convertedFavourites.push({
            data: {
              id: favourite.chapter_id,
              title: favourite.chapter_title,
              storyId: favourite.story_id,
              items: favourite.pages,
            },
          })
        : null,
    );
  }

  return convertedFavourites;
};
export const selectIsManager = state => get(state, `${user}.data.is_manager`);
export const selectManagerTutorialSeen = state =>
  get(state, `${user}.data.manager_tutorial_seen`);
export const selectChatEnabled = state =>
  get(state, `${user}.data.chat_enabled`);
