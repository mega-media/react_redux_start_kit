/**
 * Created by arShown on 2016/10/13.
 */
import React from 'react';
import BaseView, {ApplyStyles, connectToView} from '~/Core/BaseView';
import {click, reset} from './Action';
import Constant from './Constant';

@ApplyStyles()
class Buttons extends BaseView {
    constructor(props, context) {
        super(props, context);
    }

    clickHandler(style) {
        this.dispatch(click(style));
    }

    resetHandler() {
        this.dispatch(reset());
    }

    render() {
        const counterState = this.getResponse();
        const activeArray = Object.keys(counterState).filter(style => counterState[style]);
        return (
            <div>
                <div>
                    You click : {activeArray.join(' , ')}
                </div>
                <br/>
                <div styleName="btn-toolbar">
                    <div styleName="btn-group">
                        <button styleName="btn btn-primary" onClick={this.clickHandler.bind(this,"primary")}>PRIMARY</button>
                        <button styleName="btn btn-success" onClick={this.clickHandler.bind(this,"success")}>SUCCESS</button>
                        <button styleName="btn btn-warning" onClick={this.clickHandler.bind(this,"warning")}>WARNING</button>
                        <button styleName="btn btn-danger" onClick={this.clickHandler.bind(this,"danger")}>DANGER</button>
                    </div>
                    <div styleName="btn-group">
                        <button styleName="btn btn-default" onClick={this.resetHandler.bind(this)}>
                            Reset Counter
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connectToView(Constant.StoreKey)(Buttons);