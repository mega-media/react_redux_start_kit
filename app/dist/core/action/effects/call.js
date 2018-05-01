const call = (func, ...params) => ({
  type: 'SAGA_CALL',
  payload: {
    func,
    params
  }
});

export default call;
