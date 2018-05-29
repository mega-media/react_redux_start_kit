import { STORE_KEY, PING, PONG } from './constant';
import { reducerCreator } from '~/core/reducer';

export const defaultState = { isPinging: false };

export const reducer = reducerCreator(defaultState, {
  [PING]: () => ({
    isPinging: true
  }),
  [PONG]: () => ({
    isPinging: false
  })
});

export default {
  [STORE_KEY]: reducer
};
