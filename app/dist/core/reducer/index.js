import { has, curry } from 'ramda';

export const reducerCreator = curry(
  (map, initStore) => (store = initStore, { type, payload }) =>
    has(type, map) ? map[type](store, payload) : store
);
