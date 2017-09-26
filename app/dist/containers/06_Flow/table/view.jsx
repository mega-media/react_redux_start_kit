/**
 * @flow
 */
import React, { PureComponent } from 'react';
import { Dispatch, Store } from '../../../core/container/hoc';
import { applyStyles } from '../../../core/css-module';
import { STORE_KEY } from '../constant';
import { remove } from '../action';
import MemberClass from '../class';
import TableItem from '../tableItem/view';
import { compose } from 'ramda';
import type { Props } from './type';

/**
 * Table 元件綁定 state 負責監聽資料的異動
 */
@applyStyles()
class Table extends PureComponent<void, Props, void> {
  props: Props;

  removeHandler = (uid: number): (() => void) => () => {
    this.props.dispatch(remove(uid));
  };

  render() {
    const { title, storeData } = this.props;
    const dataRow: any =
      storeData.length > 0
        ? storeData.map((item: MemberClass, index: number) => {
            const { uid, name, gender, married } = item;
            return (
              <TableItem
                key={`item-${uid}`}
                index={+index + 1}
                row={item}
                removeHandler={this.removeHandler(uid)}
              />
            );
          })
        : <tr>
            <td colSpan={5} styleName="text-center text-muted">
              Empty !
            </td>
          </tr>;
    return (
      <div>
        <p>
          {title}
        </p>
        <div styleName="table-responsive">
          <table styleName="table table-condensed">
            <thead>
              <tr>
                <td>#</td>
                <td>name</td>
                <td>gender</td>
                <td>married</td>
                <td>actions</td>
              </tr>
            </thead>
            <tbody>
              {dataRow}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default compose(Dispatch, Store(STORE_KEY))(Table);
