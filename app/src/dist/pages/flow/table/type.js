/**
 * @flow
 */
import type { Store } from '../../../../storage/reducers/flow';

export type Props = {
  dispatch: (action: Object | Array<Object>) => void,
  storeSelector: (...storeKey: Array<string>) => any,
  flow: Store,
  title: string
};
