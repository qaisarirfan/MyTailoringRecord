import { CLIENTS } from '../../config/clients';
import { LOADING } from './actions';
import clients from '../../config/clients';
import defaultApiClients from './defaultApiClients';
import firebaseAuthClients from './firebaseAuthClients';

export const makeAnAction = (action) => (status, data) => {
  const newAction = { ...action, type: action.type + status, ...data };
  delete newAction.request;
  return newAction;
};

export const addAnTokenToRequest = (state) => (request) => {
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

const apiClients = () => (store) => (next) => (action) => {
  const clientName = action.client || 'default';

  if (!clients[clientName]) {
    throw new Error(
      `Client with name "${clientName}" has not been defined in middleware`
    );
  }

  if (!action || !action.request) {
    return next(action);
  }

  const makeAction = makeAnAction(action);

  next(makeAction(LOADING, false));

  let client = clients[clientName].client;
  let clientAction;
  if (clientName === CLIENTS.FIREBASE_AUTH) {
    clientAction = firebaseAuthClients;
  } else {
    clientAction = defaultApiClients;
  }
  return clientAction(store)(next)(action)(client);
};

export default apiClients;
