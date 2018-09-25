import { reducerCreator } from '@core/reducer';

const defaultState = { isPinging: false };

const reducer = reducerCreator(defaultState, {
  PING: () => ({
    isPinging: true
  }),
  PONG: () => ({
    isPinging: false
  })
});

export default reducer;
