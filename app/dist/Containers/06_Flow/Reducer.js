/**
 * Created by arShown on 2016/10/13.
 * @flow
 */
import Constant from './Constant';
import type { MemberDataType } from './Type';

export default function(
  state: Array<MemberDataType> = [],
  action: {
    type: string,
    uid?: number,
    data?: MemberDataType
  }
): Array<MemberDataType> {
  const { type, uid, data } = action;
  switch (type) {
    case Constant.FLOW_INSERT: {
      if (!data) return state;
      let newState: Array<MemberDataType> = [];
      newState = newState.concat(state);
      newState.push(data);
      return newState;
    }
    case Constant.FLOW_REMOVE: {
      if (!uid) return state;
      const newState = state.reduce(
        (array: Array<MemberDataType>, memberObject: MemberDataType) => {
          if (memberObject.uid !== uid) array.push(memberObject);
          return array;
        },
        []
      );
      return newState;
    }
    default:
      return state;
  }
}
