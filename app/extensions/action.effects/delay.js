/**
 * 延遲 action
 * @param duration {number} the number of milliseconds to delay execution
 * @return {{type: SAGA_DELAY}}
 */
const delay = (duration, action) => ({
  type: 'SAGA_DELAY',
  payload: {
    action,
    duration
  }
});

export default delay;
