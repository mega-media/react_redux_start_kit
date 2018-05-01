export default correctInterval => ({ type, payload: { interval } }) =>
  type === 'SAGA_POLLING' && correctInterval === interval;
