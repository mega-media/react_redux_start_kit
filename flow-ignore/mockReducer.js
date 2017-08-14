declare module 'mockReducer' {
  declare var exports: (
    initState: any,
    Reducer: (s: any, a: any) => any
  ) => any;
}
