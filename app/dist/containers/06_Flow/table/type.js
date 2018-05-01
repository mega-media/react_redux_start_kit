/**
 * @flow
 */
import type { Store } from '../type';

export type Props = {
  dispatch: (action: Object | Array<Object>) => void,
  storeSelector: (...storeKey: Array<string>) => any,
  storeData: Store,
  title: string
};
