module.exports = (func, ...params) => ({
  type: 'SAGA_CALL',
  payload: {
    func,
    params
  }
});
