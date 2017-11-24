import { has } from 'ramda';

module.exports = (initState, actionMaps) => (
  state = initState,
  { type, payload }
) => (has(type)(actionMaps) ? actionMaps[type](state, payload) : state);
