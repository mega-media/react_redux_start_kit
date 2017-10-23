/* @flow */
import React, { PureComponent } from 'react';
import { Dispatch, Store } from '../../../core/container/hoc';
import { applyStyles } from '../../../core/css-module';

/* constant */
import { STORE_KEY } from './constant';

/* actions */
import { fetch, changeActive } from './action';
import { cancelLastAction, fetchByUser } from '../todo/action';

/* helper */
import { ObjectEqual } from '~/helpers/equal';
import { compose } from 'ramda';

/* type */
import type { Props } from './type';

@applyStyles()
export class User extends PureComponent<void, Props, void> {
  /**
   * 改變選擇成員
   * @param userId
   */
  changeActive = (userId: number) => () => {
    this.props.dispatch([
      /* 變更 active id */
      changeActive(userId),
      /* 取消佇列中等待回傳的監聽 */
      cancelLastAction(),
      /* 取得選擇的成員的 todo 列表 */
      fetchByUser(userId)
    ]);
  };

  componentWillMount() {
    /* 渲染前就撈成員資料 */
    this.props.dispatch(fetch());
  }

  componentDidUpdate() {
    /* 預設撈取第一個成員的 todo list */
    const {
      users: [firstUser, ...others],
      activeUserId
    } = this.props.storeData;
    if (firstUser && activeUserId === 0) this.changeActive(firstUser.id)();
  }

  render() {
    const { activeUserId, users } = this.props.storeData;
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

export default compose(Dispatch, Store(STORE_KEY))(User);
