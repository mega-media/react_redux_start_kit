/**
 * 取消所有 effects
 * @return {{type: SAGA_CANCEL_ALL}}
 */
const cancelAll = () => ({
  type: 'SAGA_CANCEL_ALL'
});

export default cancelAll;
