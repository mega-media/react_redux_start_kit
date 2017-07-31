/**
 * @flow
 */
import Constant from './constant';
import type { MemberDataType } from './type';

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
