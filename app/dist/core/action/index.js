import { curry, has } from 'ramda';

export const actionCreator = map =>
  curry((type, payload) => ({
    type,
    payload: has(type, map) ? map[type](payload) : null
  }));
