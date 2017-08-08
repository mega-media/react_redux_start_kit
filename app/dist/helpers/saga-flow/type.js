/* @flow */

/* constant */
export type ACTION = 'SAGA_ACTION';
export type CANCEL = 'SAGA_CANCEL';

/* action type */
export type SagaAction = {
  type: ACTION,
  payload: {
    api: string,
    stream: Promise<any>
  }
};

export type CancelAction = {
  type: CANCEL
};
