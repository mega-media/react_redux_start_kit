/**
 * @flow
 */
import React, { PureComponent } from 'react';
import TableView from './table/view';
import FormView from './form/view';

/**
 *  flow type declare
 *  Component<DefaultProps, Props, State>
 */
export default class Flow extends PureComponent<void, void, void> {
  render() {
    /**
     * 當結構複雜時可將內容切分並獨立成子元件，易於維護也增加可讀性
     */
    return (
      <div>
        <p>Personnel Data Sheet</p>
        <FormView />
        <hr />
        <TableView title="Table Title" />
      </div>
    );
  }
}
