/**
 * @flow
 */
import KeyMirror from 'keymirror';
const Constant = Object.assign(
  {
    StoreKey: 'flowStore'
  },
  KeyMirror({
    FLOW_INSERT: null,
    FLOW_REMOVE: null
  })
);
export default Constant;
