const urls = Object.freeze({
  prod: 'https://api.exchangeratesapi.io',
  dev: 'https://api.exchangeratesapi.io',
});

const baseUrl = __DEV__ ? urls.dev : urls.prod;

export const ERROR_CODES = {
  'auth/email-already-in-use':
    'The email address is already in use by another account.',
  'auth/invalid-email': 'That email address is invalid!',
  'auth/operation-not-allowed':
    'Enable email/password accounts in the Firebase Console, under the Auth tab.',
  'auth/weak-password': 'The password is too weak.',
  'auth/internal-error': 'An internal error has occurred, please try again.',
  'auth/configuration-not': 'An internal error has occurred, please try again.',
  'auth/network-request-failed':
    'A network error has occurred, please try again.',
};

export const constants = Object.freeze({
  baseURL: baseUrl,
  apiURL: `${baseUrl}/api`,
  googleMapsURL: 'https://maps.googleapis.com/maps/api',

  HTTPStatusCode: {
    100: 'Continue',
    101: 'Switching Protocols',
    102: 'Processing',
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    203: 'Non-Authoritative Information',
    204: 'No Content',
    205: 'Reset Content',
    206: 'Partial Content',
    300: 'Multiple Choices',
    301: 'Moved Permanently',
    302: 'Found',
    303: 'See Other',
    304: 'Not Modified',
    305: 'Use Proxy',
    306: 'Unused',
    307: 'Temporary Redirect',
    308: 'Permanent Redirect',
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    406: 'Not Acceptable',
    407: 'Proxy Authentication Required',
    408: 'Request Timeout',
    409: 'Conflict',
    410: 'Gone',
    411: 'Length Required',
    412: 'Precondition Failed',
    413: 'Request Entity Too Large',
    414: 'Request-URI Too Long',
    415: 'Unsupported Media Type',
    416: 'Requested Range Not Satisfiable',
    417: 'Expectation Failed',
    418: "I'm a teapot",
    422: 'Unprocessable Entity',
    428: 'Precondition Required',
    429: 'Too Many Requests',
    431: 'Request Header Fields Too Large',
    451: 'Unavailable For Legal Reasons',
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    505: 'HTTP Version Not Supported',
    511: 'Network Authentication Required',
    520: 'Web server is returning an unknown error',
    522: 'Connection timed out',
    524: 'A timeout occurred',
  },
});

export const REDUCERS_NAME = {
  authentication: 'authentication',
  firstLoad: 'firstLoad',
  languages: 'languages',
  navigation: 'navigation',
  user: 'user',
};
