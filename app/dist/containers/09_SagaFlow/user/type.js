/* @flow */
/**
 * constant type
 */
export type SAVE = 'USER_SAVE';
export type CHANGE = 'USER_CHANGE';

/**
 * action type
 */
export type Action = SaveAction | ChangeAction;
export type SaveAction = { type: SAVE, payload: Array<UserData> };
export type ChangeAction = { type: CHANGE, payload: number };

/**
 * store type
 */
export type UserData = {
  id: number,
  name: string
};
export type Store = {
  activeUserId: number,
  users: Array<UserData>
};
