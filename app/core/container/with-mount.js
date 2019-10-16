/* @flow */
import { Component, createFactory } from 'react';
import { isNil, F } from 'ramda';
import type { withMount as HocType } from './_type';

export const withMount: HocType = didMount => WrapperComponent => {
  const factory = createFactory(WrapperComponent);

  return class extends Component<any, void> {
    unmount: any = F;

    componentDidMount() {
      this.unmount = didMount(this.props);
      if (!isNil(this.unmount) && typeof this.unmount !== 'function')
        throw 'withMount 回傳的 componentWillUnmount 必須為函式';
    }

    componentWillUnmount() {
      this.unmount(this.props);
    }

    render() {
      return factory(this.props);
    }
  };
};

export default withMount;
