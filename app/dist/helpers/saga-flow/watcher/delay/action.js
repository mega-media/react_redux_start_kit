import { curry } from 'ramda';

/**
 * 延遲 action
 * @param duration {number} the number of milliseconds to delay execution
 * @return {{type: SAGA_DELAY}}
 */
export default curry((duration, action) => ({
  type: 'SAGA_DELAY',
  payload: {
    action,
    duration
  }
}));
