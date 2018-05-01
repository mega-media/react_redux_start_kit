export default correctDuration => ({ type, payload: { duration } }) =>
  type === 'SAGA_DELAY' && correctDuration === duration;
