/**
 * @flow
 */
import React, { PureComponent } from 'react';
import { applyStyles } from '../../../core/css-module';
import MemberClass from '../class';
import type { Props } from './type';

@applyStyles()
export default class TableItem extends PureComponent<void, Props, void> {
  props: Props;

  render() {
    const {
      index,
      row: { uid, name, gender, married },
      removeHandler
    } = this.props;
    return (
      <tr>
        <td>
          {index}
        </td>
        <td>
          {name}
        </td>
        <td>
          {gender === 'female' ? 'F' : 'M'}
        </td>
        <td>
          {married ? 'YES' : 'NO'}
        </td>
        <td>
          <button styleName="btn btn-danger btn-xs" onClick={removeHandler}>
            <i styleName="glyphicon glyphicon-trash" />
          </button>
        </td>
      </tr>
    );
  }
}
