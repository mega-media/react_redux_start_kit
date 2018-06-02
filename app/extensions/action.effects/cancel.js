/**
 * 取消特定 effect
 * @return {{type: SAGA_CANCEL}}
 */
const cancel = action => ({
  type: 'SAGA_CANCEL',
  payload: {
    action
  }
});

export default cancel;
