/**
 * @flow
 */
import React, { Fragment, PureComponent } from 'react';
import { applyStyles } from '@core/container';
import MemberClass from '@src/storage/schema/member';
import type { Props, State } from './type';

@applyStyles()
export default class TableItem extends PureComponent<Props, State> {
  props: Props;
  state: State = {
    data: this.props.row,
    removeModify: false,
    updateModify: false
  };

  changeHandler = ({ target: { type, name, value } }: Object) => {
    this.setState(({ data }) => {
      return {
        data: Object.assign(new MemberClass(), {
          ...data,
          [name]: name === 'married' ? value === 'true' : value
        })
      };
    });
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
    this.setState({
      removeModify: false,
      updateModify: false
    });
  };

  render() {
    const { index } = this.props;
    const {
      data: { uid, name, gender, married },
      updateModify,
      removeModify
    } = this.state;

    return (
      <tr>
        {updateModify ? (
          <Fragment>
            <td>{index}</td>
            <td>
              <input
                type="text"
                value={name}
                name="name"
                onChange={this.changeHandler}
                styleName="form-control"
              />
            </td>
            <td>
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
            </td>
            <td>
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
          </Fragment>
        ) : (
          <Fragment>
            <td>{index}</td>
            <td>{name}</td>
            <td>{gender === 'female' ? 'F' : 'M'}</td>
            <td>{married ? 'YES' : 'NO'}</td>
          </Fragment>
        )}
        <td>
          {updateModify || removeModify ? (
            <div>
              <a onClick={this.submit} style={{ cursor: 'pointer' }}>
                確定
              </a>
              <a
                onClick={this.toolsToggle}
                style={{ cursor: 'pointer', marginLeft: '10px' }}
              >
                取消
              </a>
            </div>
          ) : (
            <div>
              <button
                styleName="btn btn-primary btn-xs"
                onClick={this.updateToolToggle}
              >
                <i styleName="glyphicon glyphicon-pencil" />
              </button>
              <button
                styleName="btn btn-danger btn-xs"
                style={{ marginLeft: '5px' }}
                onClick={this.removeToolToggle}
              >
                <i styleName="glyphicon glyphicon-trash" />
              </button>
            </div>
          )}
        </td>
      </tr>
    );
  }
}
