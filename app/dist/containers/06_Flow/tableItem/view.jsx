/**
 * @flow
 */
import React, { PureComponent } from 'react';
import { applyStyles } from '../../../core/container/css-module';
import MemberClass from '../class';
import type { Props, State } from './type';

@applyStyles()
export default class TableItem extends PureComponent<void, Props, State> {
  props: Props;
  state: State = {
    data: this.props.row,
    removeModify: false,
    updateModify: false
  };

  changeHandler = ({ target: { type, name, value } }: any) => {
    this.setState(({ data }) => ({
      data: {
        ...data,
        [name]: name === 'married' ? value === 'true' : value
      }
    }));
  };

  removeToolToggle = () => {
    this.setState({
      removeModify: true,
      updateModify: false
    });
  };

  updateToolToggle = () => {
    this.setState({
      updateModify: true,
      removeModify: false
    });
  };

  toolsToggle = () => {
    this.setState({
      removeModify: false,
      updateModify: false,
      data: this.props.row
    });
  };

  submit = () => {
    const { updateModify, removeModify, data } = this.state;
    const { removeHandler, updateHandler } = this.props;
    removeModify && removeHandler();
    updateModify && updateHandler(data);
  };

  componentWillReceiveProps({ row }: Props) {
    this.setState(
      {
        data: row
      },
      this.toolsToggle
    );
  }

  render() {
    const { index } = this.props;
    const {
      data: { uid, name, gender, married },
      updateModify,
      removeModify
    } = this.state;

    return (
      <tr>
        {updateModify
          ? [
              <td key={`index-edit-${index}`}>{index}</td>,
              <td key={`name-edit-${index}`}>
                <input
                  type="text"
                  value={name}
                  name="name"
                  onChange={this.changeHandler}
                  styleName="form-control"
                />
              </td>,
              <td key={`gender-edit-${index}`}>
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
              </td>,
              <td key={`married-edit-${index}`}>
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
              </td>
            ]
          : [
              <td key={`index-${index}`}>{index}</td>,
              <td key={`name-${index}`} onClick={this.updateToolToggle}>
                {name}
              </td>,
              <td key={`gender-${index}`} onClick={this.updateToolToggle}>
                {gender === 'female' ? 'F' : 'M'}
              </td>,
              <td key={`married-${index}`} onClick={this.updateToolToggle}>
                {married ? 'YES' : 'NO'}
              </td>
            ]}
        <td>
          {updateModify || removeModify ? (
            <div>
              <a onClick={this.submit} style={{ cursor: 'pointer' }}>
                確定
              </a>
              <a
                onClick={this.toolsToggle}
                style={{ cursor: 'pointer', marginLeft: '10px' }}>
                取消
              </a>
            </div>
          ) : (
            <div>
              <button
                styleName="btn btn-primary btn-xs"
                onClick={this.updateToolToggle}>
                <i styleName="glyphicon glyphicon-pencil" />
              </button>
              <button
                styleName="btn btn-danger btn-xs"
                style={{ marginLeft: '5px' }}
                onClick={this.removeToolToggle}>
                <i styleName="glyphicon glyphicon-trash" />
              </button>
            </div>
          )}
        </td>
      </tr>
    );
  }
}
