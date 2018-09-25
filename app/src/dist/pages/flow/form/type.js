/* @flow */
export type Props = {
  dispatch: (action: Object | Array<Object>) => void,
  storeSelector: (...storeKey: Array<string>) => any
};

export type State = {
  uid: number,
  name: string,
  gender: 'female' | 'male',
  married: boolean
};
