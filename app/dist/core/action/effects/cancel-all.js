/**
 * 取消所有 effects
 * @return {{type: SAGA_CANCEL_ALL}}
 */
module.exports = () => ({
  type: 'SAGA_CANCEL_ALL'
});
