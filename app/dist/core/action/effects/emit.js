import { curry } from 'ramda';

module.exports = curry((type, payload) => ({
  type,
  payload
}));
