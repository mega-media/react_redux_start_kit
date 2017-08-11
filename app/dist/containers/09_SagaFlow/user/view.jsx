/* @flow */
import React from 'react';
import BaseView, { applyStyles, connect } from '~/core/baseView';

/* constant */
import { STORE_KEY } from './constant';

/* actions */
import { fetch, changeActive } from './action';
import { cancelLastAction, fetchByUser } from '../todo/action';

/* helper */
import { ObjectEqual } from '~/helpers/equal';

@applyStyles()
export class User extends BaseView<void, any, void> {
  constructor(props: any, context: any) {
    super(props, context);
  }

  /**
   * 改變選擇成員
   * @param userId
   */
  changeActive = (userId: number) => () => {
    this.dispatch([
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
    this.dispatch(fetch());
  }

  shouldComponentUpdate(nextProps: any) {
    /* 成員資料有變更，回傳 true */
    return !ObjectEqual(this.getResponse(), this.getResponse(nextProps));
  }

  componentDidUpdate() {
    /* 預設撈取第一個成員的 todo list */
    const { users: [firstUser, ...others], activeUserId } = this.getResponse();
    if (firstUser && activeUserId === 0) this.changeActive(firstUser.id)();
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
