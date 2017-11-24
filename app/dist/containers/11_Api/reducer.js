/* @flow */
import { STORE_KEY, SAGA_SAVE } from './constant';
import type { Store, Actions } from './type';

export default {
  [STORE_KEY]: (store: Store = { items: [] }, action: Actions) => {
    switch (action.type) {
      case SAGA_SAVE:
        return {
          items: action.payload.items
        };
      default:
        return store;
    }
  }
};
