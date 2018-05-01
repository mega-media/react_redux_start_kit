/**
 * 取消最後一筆 effects
 * @return {{type: SAGA_CANCEL_LATEST}}
 */
const cancelLatest = () => ({
  type: 'SAGA_CANCEL_LATEST'
});

export default cancelLatest;
