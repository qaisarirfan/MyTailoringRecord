import { name as appName } from '../../package.json';

export function createActionName(reducerName, name) {
  return `app/${appName}/${reducerName}/${name}`;
}

export function createReducer(reducer, initialState) {
  return (state = initialState, { type, payload }) => {
    if (reducer[type]) {
      return reducer[type](state, payload);
    }
    return state;
  };
}
