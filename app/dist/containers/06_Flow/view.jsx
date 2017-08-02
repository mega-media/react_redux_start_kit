/**
 * @flow
 */
import React from 'react';
import TableView from './table/view';
import FormView from './form/view';
import { applyStyles } from '~/core/baseView';

/**
 *  flow type declare
 *  React.Component<DefaultProps, Props, State>
 */
@applyStyles()
export default class Flow extends React.Component<void, void, void> {
  constructor(props: void, context: any) {
    super(props, context);
  }

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
