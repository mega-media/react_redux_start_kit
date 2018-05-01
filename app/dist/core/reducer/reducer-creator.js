import { has } from 'ramda';

const reducerCreator = (initState, actionMaps) => (
  state = initState,
  { type, payload }
) => (has(type)(actionMaps) ? actionMaps[type](state, payload) : state);

export default reducerCreator;
