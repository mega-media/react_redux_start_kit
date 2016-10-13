/**
 * Created by arShown on 2016/10/13.
 */
import React from 'react';
import BaseView, {ApplyStyles, connectToView} from '~/Core/BaseView';
import {click, reset} from './Action';

@ApplyStyles()
class Counter extends BaseView {
    constructor(props, context) {
        super(props, context);
    }

    clickHandler(){
        this.dispatch(click());
    }

    resetHandler(){
        this.dispatch(reset());
    }

    render() {
        const counterState = this.getResponse();
        return (
            <div>
                <div>
                    Clicks : {counterState}
                </div>
                <br/>
                <button styleName="btn btn-primary" onClick={this.clickHandler.bind(this)}>
                    Click the button
                </button>
                &nbsp;
                <button styleName="btn btn-default" onClick={this.resetHandler.bind(this)}>
                    Reset Counter
                </button>
            </div>
        );
    }
}

export default connectToView("counterStore")(Counter);