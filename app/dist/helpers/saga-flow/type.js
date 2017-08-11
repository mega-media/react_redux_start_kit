/* @flow */

/* constant */
export type ACTION = 'SAGA_ACTION';
export type CANCEL = 'SAGA_CANCEL';

/**
 * action type  [API 發送]
 * @params type [SAGA_ACTION]
 * @params payload
 *   - api    [API 代碼]
 *   - steam  [api promise]
 */
export type SagaAction = {
  type: ACTION,
  payload: {
    api: string,
    stream: Promise<any>
  }
};

/**
 * action type  [取消 API 監聽]
 */
export type CancelAction = {
  type: CANCEL
};
