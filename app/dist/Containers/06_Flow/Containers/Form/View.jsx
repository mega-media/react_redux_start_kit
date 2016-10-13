/**
 * Created by arShown on 2016/10/13.
 */
//@flow
import React from 'react';
import BaseView, {ApplyStyles, connectToView} from '~/Core/BaseView';
import {add} from '../../Action';
import type {MemberDataType} from '../../Type';

@ApplyStyles()
class Form extends BaseView {
    uidIndex:number;
    state:?MemberDataType;

    constructor(props, context) {
        super(props, context);
        this.uidIndex = 1;
        this.state = {
            uid: 1,
            name: "",
            gender: "male",
            married: false
        };
    }

    changeHandler(stateKey:string, e:Object) {
        this.setState({
            [stateKey]: stateKey === "married" ? e.target.value === "true" :e.target.value
        })
    }

    validate():boolean {
        if (!this.state)
            return false;
        const {name} = this.state;
        if (!name)
            return false;
        return true;
    }

    submit(e) {
        e.preventDefault();
        if (this.state && this.validate()) {
            this.state.uid = this.uidIndex;
            this.dispatch(add(this.state));
            this.uidIndex += 1;
        }
    }

    render() {

        return (
            <form>
                <div styleName="form-group">
                    <label>Name (*)</label>
                    <input type="type" onChange={this.changeHandler.bind(this,"name")} styleName="form-control"/>
                </div>
                <div styleName="form-group">
                    <label>Marital status</label>
                    <br/>
                    <label styleName="radio-inline">
                        <input type="radio" onChange={this.changeHandler.bind(this,"married")} name="marry" value="false"
                               defaultChecked/> Unmarried
                    </label>
                    <label styleName="radio-inline">
                        <input type="radio" onChange={this.changeHandler.bind(this,"married")} name="marry" value="true"/>
                        Married
                    </label>
                </div>
                <div styleName="form-group">
                    <label>Gender</label>
                    <br/>
                    <label styleName="radio-inline">
                        <input type="radio" onChange={this.changeHandler.bind(this,"gender")} name="gender" value="male"
                               defaultChecked/> Male
                    </label>
                    <label styleName="radio-inline">
                        <input type="radio" onChange={this.changeHandler.bind(this,"gender")} name="gender"
                               value="female"/> Female
                    </label>
                </div>
                <button styleName="btn btn-primary" onClick={this.submit.bind(this)}>submit</button>
            </form>
        );
    }
}

export default connectToView()(Form);