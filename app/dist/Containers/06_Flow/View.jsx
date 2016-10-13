/**
 * Created by arShown on 2016/10/13.
 */
//@flow
import React from 'react';
import TableView from './Containers/Table/View';
import FormView from './Containers/Form/View';
import {ApplyStyles} from '~/Core/BaseView';

@ApplyStyles()
export default class Flow extends React.Component {
    constructor(props:any, context:any) {
        super(props, context);
    }

    render() {
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

