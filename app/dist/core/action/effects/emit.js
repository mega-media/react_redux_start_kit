import { curry } from 'ramda';

module.exports = curry((type, payload) => ({
  type: 'SAGA_EMIT',
  payload: {
    type,
    payload
  }
}));
