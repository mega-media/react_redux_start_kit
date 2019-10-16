/* @flow */
import { Component, createFactory } from 'react';
import { isNil } from 'ramda';

export const withMount = (didMount: () => any) => WrapperComponent => {
  const factory = createFactory(WrapperComponent);

  return class extends Component<any, void> {
    unmount = _ => {};

    componentDidMount() {
      this.unmount = didMount(this.props);
      if (!isNil(this.unmount) && typeof this.unmount !== 'function') {
        throw 'withMount 回傳的 componentWillUnmount 必須為函式';
        this.unmount = _ => {};
      }
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
