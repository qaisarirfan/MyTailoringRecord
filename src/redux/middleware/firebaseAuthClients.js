import {errorMessage} from '../../config/clients';
import {LOADED, ERROR} from './actions';
import {makeAnAction} from './apiClients';

const firebaseAuthClients = store => next => action => async client => {
  const {
    request: {method, args},
  } = action;

  const makeAction = makeAnAction(action);

  try {
    let result;
    if (args) {
      result = await client[method](...args);
    } else {
      result = await client[method]();
    }
    next(makeAction(LOADED, {payload: {result}}));
  } catch (error) {
    next(
      makeAction(ERROR, {
        payload: {
          result: errorMessage(error),
        },
      }),
    );
  }
};

export default firebaseAuthClients;
