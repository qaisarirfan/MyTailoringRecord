import get from 'lodash/get';

import {addAnTokenToRequest, makeAnAction} from './apiClients';
import {errorMessage} from '../../config/clients';
import {LOADED, ERROR} from './actions';

const defaultApiClients = store => next => action => client => {
  const request = addAnTokenToRequest(store.getState())(action.request);
  const makeAction = makeAnAction(action);

  return client.request(request).then(
    result => {
      const errors = get(result, 'data.errors', []);
      const payload = {result: result.data, originalPayload: action.payload};
      if (errors) {
        payload.error = {
          result: errors,
        };
      }
      next(makeAction(LOADED, {payload}));
      if (action.callback) {
        const {dispatch, getState} = store;
        action.callback(dispatch, getState, payload);
      }
    },
    error => {
      next(
        makeAction(ERROR, {
          payload: {
            result: errorMessage(error),
            originalPayload: action.payload,
          },
        }),
      );
    },
  );
};

export default defaultApiClients;
