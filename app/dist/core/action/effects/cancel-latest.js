/**
 * 取消最後一筆 effects
 * @return {{type: SAGA_CANCEL_LATEST}}
 */
module.exports = () => ({
  type: 'SAGA_CANCEL_LATEST'
});
