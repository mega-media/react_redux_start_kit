/**
 * Created by arShown on 2016/10/13.
 * @flow
 */
import React from 'react';
import TableView from './Containers/Table/View';
import FormView from './Containers/Form/View';
import {ApplyStyles} from '~/Core/BaseView';

/* flow type declare
 DP = DefaultProps
 S = State
 P = Props
 */
type DP = void;
type S = void;
type P = any;

@ApplyStyles()
export default class Flow extends React.Component<DP,P,S> {
    props:P;

    constructor(props:P, context:any) {
        super(props, context);
    }

    render() {
        /**
         * 當結構複雜時可將內容切分並獨立成子元件，易於維護也增加可讀性
         */
        return (
            <div styleName="row">
                <div styleName="col-sm-8">
                    <p>Personnel Data Sheet</p>
                    <TableView/>
                </div>
                <div styleName="col-sm-4">
                    <FormView/>
                </div>
            </div>
        );
    }
}

