module.exports = correctInterval => ({ type, payload: { interval } }) =>
  type === 'SAGA_POLLING' && correctInterval === interval;
