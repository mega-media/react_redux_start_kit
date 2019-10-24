/* @flow */
import { Component, createFactory } from 'react';
import PropTypes from 'prop-types';
import type { withContext as HocType } from './_type';

const withContext: HocType = initialContext => WrapperComponent => {
  const factory = createFactory(WrapperComponent);

  class ContextHoc extends Component<any, void> {
    static contextTypes = {
      c: PropTypes.object
    };

    getChildContext = () => ({
      c: {
        ...this.context.c,
        ...(typeof initialContext === 'function'
          ? initialContext(this.props)
          : initialContext)
      }
    });

    render() {
      return factory(this.props);
    }
  }

  ContextHoc.childContextTypes = {
    c: PropTypes.object
  };

  return ContextHoc;
};

export default withContext;
