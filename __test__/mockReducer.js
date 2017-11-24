/**
 * @flow
 * 模擬 dispatch 呼叫 Reducer 去變更 state
 */
export default (
  initState: ?Object,
  Reducer: (s: ?Object, a: Object) => any
) => {
  let state = initState;
  return {
    getState: () => state,
    setState: (mockState: Object) => (state = mockState),
    dispatch: (action: Object) => (state = Reducer(state, action)),
    restore: () => (state = initState)
  };
};
