/**
 * 取消特定 effect
 * @return {{type: SAGA_CANCEL}}
 */
module.exports = action => ({
  type: 'SAGA_CANCEL',
  payload: {
    action
  }
});
