import React, { Component } from 'react';
import { applyStyles } from '~/core/baseView';
import User from './user/view';
import Todo from './todo/view';

@applyStyles()
export default class SagaFlow extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div styleName="row">
        <div styleName="col-sm-4">
          <User />
        </div>
        <div styleName="col-sm-8">
          <Todo />
        </div>
      </div>
    );
  }
}
