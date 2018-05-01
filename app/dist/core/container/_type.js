/* @flow */
type ComponentType<A> = React$ComponentType<A>;

type UnaryFn<A, R> = (a: A) => R;

type HOC<Base, Enhanced> = UnaryFn<
  ComponentType<Base>,
  ComponentType<Enhanced>
>;

export type withDispatch = <Enhanced>(
  a: ComponentType<{
    ...$Exact<Enhanced>,
    dispatch: (action: Object | Array<Object>) => void,
    storeSelector: (...storeKey: Array<string>) => any
  }>
) => ComponentType<Enhanced>;

export type withI18n = <Enhanced>(
  a: ComponentType<{
    ...$Exact<Enhanced>,
    i18nText: (alias: string, params?: Object) => string,
    i18nLang: () => string
  }>
) => ComponentType<Enhanced>;

export type withStore = <Enhanced>(
  ...storeKey: Array<string>
) => HOC<{ ...$Exact<Enhanced>, storeData: any }, Enhanced>;

export type withStyle = <Enhanced>(
  ...styles: Array<Object>
) => HOC<Enhanced, Enhanced>;
