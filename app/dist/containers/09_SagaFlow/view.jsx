import React, { PureComponent } from 'react';
import { applyStyles } from '../../core/css-module';
import User from './user/view';
import Todo from './todo/view';

@applyStyles()
export default class SagaFlow extends PureComponent {
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
