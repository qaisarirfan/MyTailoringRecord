import axios from 'axios';
import auth from '@react-native-firebase/auth';

import {constants, ERROR_CODES} from '../utils/constants';

export const errorMessage = ({request, message, code}) => {
  let msg = '';
  if (request) {
    if (message === 'Network Error') {
      msg = 'No internet connection';
    } else if (request.status === 401) {
      msg = 'You are not authorized to access.';
    } else if (request.status === 500 || request.status === 404) {
      msg = "Server Error: We're sorry, but something went wrong. Try again";
    } else {
      msg = constants.HTTPStatusCode[request.status] || null;
    }
  } else if (code) {
    msg = ERROR_CODES[code];
  } else {
    msg = message;
  }
  return msg;
};

export const CLIENTS = {
  FIREBASE_AUTH: 'FIREBASE_AUTH',
};

export const configureClients = ({baseURL, apiURL, googleMapsURL}) => ({
  default: {
    client: axios.create({
      baseURL,
      responseType: 'json',
      headers: {
        common: {
          Accept: 'application/json',
        },
        post: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    }),
  },
  api: {
    client: axios.create({
      baseURL: apiURL,
      responseType: 'json',
      headers: {
        common: {
          Accept: 'application/json',
        },
        post: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    }),
  },
  googleMaps: {
    client: axios.create({
      baseURL: googleMapsURL,
      responseType: 'json',
      headers: {
        common: {
          Accept: 'application/json',
        },
        post: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    }),
  },
  [CLIENTS.FIREBASE_AUTH]: {
    client: auth(),
  },
});

export default configureClients(constants);
