/**
 * @flow
 */
import React from 'react';
import BaseView, { applyStyles, connect } from '~/core/baseView';
import { STORE_KEY } from '../constant';
import { remove } from '../action';
import MemberClass from '../class';
import TableItem from '../tableItem/view';
import type { Props } from './type';
/**
 * Table 元件綁定 state 負責監聽資料的異動
 */
@applyStyles()
class Table extends BaseView<void, Props, void> {
  props: Props;

  constructor(props: Props, context: any) {
    super(props, context);
  }

  removeHandler = (uid: number): (() => void) => () => {
    this.dispatch(remove(uid));
  };

  render() {
    const { title } = this.props;
    const memberStore: Array<MemberClass> = this.getResponse();
    const dataRow: any =
      memberStore.length > 0
        ? memberStore.map((item: MemberClass, index: number) => {
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

export default connect(STORE_KEY)(Table);
