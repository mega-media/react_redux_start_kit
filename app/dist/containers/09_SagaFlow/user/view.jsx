/* @flow */
import React from 'react';
import BaseView, { applyStyles, connect } from '~/core/baseView';
import { fetch, changeActive } from './action';
import { cancelLastAction, fetchByUser } from '../todo/action';
import { STORE_KEY } from './constant';
import { ObjectEqual } from '~/helpers/equal';

@applyStyles()
export class User extends BaseView<void, any, void> {
  constructor(props: any, context: any) {
    super(props, context);
  }

  changeActive = (userId: number) => () => {
    this.dispatch([
      changeActive(userId),
      cancelLastAction(),
      fetchByUser(userId)
    ]);
  };

  componentWillMount() {
    this.dispatch(fetch());
  }

  shouldComponentUpdate(nextProps: any) {
    return !ObjectEqual(this.getResponse(), this.getResponse(nextProps));
  }

  componentDidUpdate() {
    const { users: [firstUser, ...others] } = this.getResponse();
    if (firstUser) this.changeActive(firstUser.id)();
  }

  render() {
    const { activeUserId, users } = this.getResponse();
    return (
      <div>
        <label>選擇成員</label>
        {users.length
          ? users.map(({ id, name }, index) =>
              <div styleName="radio" key={`user-${id}`}>
                <label>
                  <input
                    type="radio"
                    name="user"
                    value={id}
                    onClick={this.changeActive(id)}
                    defaultChecked={index === activeUserId}
                  />
                  {name}
                </label>
              </div>
            )
          : <div>載入中...</div>}
      </div>
    );
  }
}

export default connect(STORE_KEY)(User);
