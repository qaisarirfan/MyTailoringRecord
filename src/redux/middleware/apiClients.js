import get from 'lodash/get';
import { LOADING, LOADED, ERROR } from './actions';
import { CLIENTS, errorMessage } from '../../config/clients';

const apiClients = clients => store => next => action => {
  const makeAction = (status, data) => {
    const newAction = { ...action, type: action.type + status, ...data };
    delete newAction.request;
    return newAction;
  };

  const addTokenToRequest = (state, request) => {
    const authToken = null;
    return authToken
      ? {
          ...request,
          headers: {
            ...(request.headers || null),
            Authorization: `Bearer ${authToken}`,
          },
        }
      : request;
  };

  if (!action || !action.request) {
    return next(action);
  }

  const clientName = action.client || 'default';

  if (!clients[clientName]) {
    throw new Error(
      `Client with name "${clientName}" has not been defined in middleware`,
    );
  }

  next(makeAction(LOADING, false));

  const request = addTokenToRequest(store.getState(), action.request);

  let requestTo;
  console.log(clientName, request.arguments);
  if (clientName === CLIENTS.FIREBASE_AUTH) {
    if (request?.arguments) {
      requestTo = clients[clientName].client[request.method](
        ...request.arguments,
      );
    } else {
      requestTo = clients[clientName].client[request.method]();
    }
  } else {
    requestTo = clients[clientName].client.request(request);
  }

  return requestTo
    .then(result => {
      if (clientName === CLIENTS.FIREBASE_AUTH) {
        next(makeAction(LOADED, { payload: { result } }));
      } else {
        const errors = get(result, 'data.errors');
        const payload = { result: result.data };
        if (errors) {
          payload.error = {
            result: errors,
          };
        }
        next(makeAction(LOADED, { payload }));
        if (action.callback) {
          const { dispatch, getState } = store;
          action.callback(dispatch, getState, payload);
        }
      }
    })
    .catch(error => {
      console.log(error);
      next(
        makeAction(ERROR, {
          payload: {
            result: errorMessage(error),
          },
        }),
      );
    });
};

export default apiClients;
