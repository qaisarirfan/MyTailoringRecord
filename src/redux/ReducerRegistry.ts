// This class holds our active reducers.
// When a reducer is imported somewhere in code
// it gets automatically added to the store.

import has from 'lodash/has';

export class ReducerRegistry {
  emitChange: Function = () => null;
  reducers: object = {};

  getReducers() {
    return { ...this.reducers };
  }

  register(
    name: string,
    reducer: {
      (
        state: object,
        { type, payload }: { type: string; payload: object },
      ): object;
    },
  ) {
    if (has(this.reducers, name)) {
      return;
    }

    this.reducers = { ...this.reducers, [name]: reducer };

    if (this.emitChange) {
      this.emitChange(this.getReducers());
    }
  }

  setChangeListener(listener: Function) {
    this.emitChange = listener;
  }
}

export default new ReducerRegistry();
