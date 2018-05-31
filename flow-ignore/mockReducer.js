declare module 'mockReducer' {
  declare module.exports: (
    initState: any,
    Reducer: (s: any, a: any) => any
  ) => any;
}
