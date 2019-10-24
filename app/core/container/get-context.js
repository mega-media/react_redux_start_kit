/* @flow */
import { Component, createFactory } from 'react';
import PropTypes from 'prop-types';
import type { getContext as HocType } from './_type';

const getContext: HocType = WrapperComponent => {
  const factory = createFactory(WrapperComponent);

  return class extends Component<any, void> {
    static contextTypes = {
      c: PropTypes.object
    };

    render() {
      return factory({ ...this.props, ...this.context.c });
    }
  };
};

export default getContext;
