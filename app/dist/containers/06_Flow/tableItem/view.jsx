/**
 * @flow
 */
import React, { Component } from 'react';
import { applyStyles } from '~/core/baseView';
import MemberClass from '../class';
import type { Props } from './type';

@applyStyles()
export default class TableItem extends Component<void, Props, void> {
  props: Props;

  constructor(props: Props, context: any) {
    super(props, context);
  }

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
