import { curry } from 'ramda';

/**
 * 輪詢 action
 * @param interval {number} 間隔時間
 * @return {{type: SAGA_POLLING}}
 */
export default curry((interval, action) => ({
  type: 'SAGA_POLLING',
  payload: {
    action,
    interval
  }
}));
