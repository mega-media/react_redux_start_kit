module.exports = func => ({
  type: 'SAGA_CALL',
  payload: {
    func
  }
});
