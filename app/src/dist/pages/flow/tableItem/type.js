/**
 * @flow
 */
import MemberClass from '@src/storage/schema/member';

export type Props = {
  index: number,
  row: MemberClass,
  removeHandler: () => void,
  updateHandler: (data: MemberClass) => void
};

export type State = {
  removeModify: boolean,
  updateModify: boolean,
  data: MemberClass
};
