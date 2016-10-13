/**
 * Created by arShown on 2016/10/13.
 */
import React from 'react';
import BaseView, {connectToView} from '~/Core/BaseView';
import {click, reset} from './Action';

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
                <button onClick={this.clickHandler.bind(this)}>
                    Click the button
                </button>
                &nbsp;
                <button onClick={this.resetHandler.bind(this)}>
                    Reset Counter
                </button>
            </div>
        );
    }
}

export default connectToView("counterStore")(Counter);