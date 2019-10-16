/**
 * @flow
 */
import React, { PureComponent } from 'react';
import { withDispatch, applyStyles } from '@core/container';
import { add } from '../action';
import MemberClass from '@src/storage/schema/member';
import type { Props, State } from './type';

/**
 * Form 元件只負責處理表單操作
 */
@applyStyles()
class Form extends PureComponent<Props, State> {
  props: Props;
  //資料序號
  uidIndex: number = 1;
  //記錄新增欄位內容
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = this.initializeState();
  }

  initializeState = (): State => ({
    uid: this.uidIndex,
    name: '',
    gender: 'male',
    married: false
  });

  changeHandler = ({ target: { name, value } }: any) => {
    //根據欄位更新 state
    this.setState({
      [name]: name === 'married' ? value === 'true' : value
    });
  };

  validate = (): boolean => {
    //檢查有沒有輸入 name
    const { name } = this.state;
    return !!name;
  };

  submit = (e: Event): void => {
    e.preventDefault();
    if (this.validate()) {
      //執行新增 action
      this.props.dispatch(add(Object.assign(new MemberClass(), this.state)));
      //新增增加 uid 序號
      this.uidIndex += 1;
      //初始化表單
      this.setState(this.initializeState());
    }
  };

  render() {
    const { name, married, gender } = this.state;
    return (
      <form>
        <div styleName="form-group">
          <label>Name (*)</label>
          <input
            type="text"
            value={name}
            name="name"
            onChange={this.changeHandler}
            styleName="form-control"
          />
        </div>
        <div styleName="form-group">
          <label>Marital status</label>
          <br />
          <label styleName="radio-inline">
            <input
              type="radio"
              onChange={this.changeHandler}
              name="married"
              value="false"
              checked={!married}
            />
            Unmarried
          </label>
          <label styleName="radio-inline">
            <input
              type="radio"
              onChange={this.changeHandler}
              name="married"
              value="true"
              checked={married}
            />
            Married
          </label>
        </div>
        <div styleName="form-group">
          <label>Gender</label>
          <br />
          <label styleName="radio-inline">
            <input
              type="radio"
              onChange={this.changeHandler}
              name="gender"
              value="male"
              checked={gender === 'male'}
            />
            Male
          </label>
          <label styleName="radio-inline">
            <input
              type="radio"
              onChange={this.changeHandler}
              name="gender"
              checked={gender === 'female'}
              value="female"
            />
            Female
          </label>
        </div>
        <button styleName="btn btn-primary" onClick={this.submit}>
          submit
        </button>
      </form>
    );
  }
}

export default withDispatch(Form);
