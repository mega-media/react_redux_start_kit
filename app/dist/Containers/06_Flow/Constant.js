/**
 * @flow
 */
import KeyMirror from 'keymirror';
const Constant = Object.assign(
  {
    StoreKey: 'FlowStore'
  },
  KeyMirror({
    FLOW_INSERT: null,
    FLOW_REMOVE: null
  })
);
export default Constant;
