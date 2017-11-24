import { expect } from 'chai';
import mockReducer from 'mockReducer';
import { SAVE_LIST, APPEND_ITEM, UPDATE_ITEM, REMOVE_ITEM } from '../constant';
import { pluck, find, propEq } from 'ramda';
import { defaultState, reducer } from '../reducer';

describe('sample-todo reducer testing', () => {
  const { setState, getState, dispatch, restore } = mockReducer(
    defaultState,
    reducer
  );
  afterEach(() => {
    restore();
  });

  it('儲存遠端資料', () => {
    const { todos, nextIdVal } = dispatch({
      type: SAVE_LIST,
      payload: [
        {
          id: 2,
          title: 'foo',
          completed: false
        },
        {
          id: 1,
          title: 'bar',
          completed: true
        },
        {
          id: 3,
          title: 'baz',
          completed: true
        }
      ]
    });
    expect(pluck('id', todos)).to.deep.equal([3, 2, 1]);
    expect(todos).to.have.lengthOf(3);
    expect(nextIdVal).to.equal(4);
    /* 重新計算 */
    const { todos: nextTodos, nextIdVal: nextNextIdVal } = dispatch({
      type: SAVE_LIST,
      payload: [
        {
          id: 4,
          title: 'foo',
          completed: false
        },
        {
          id: 5,
          title: 'bar',
          completed: true
        }
      ]
    });
    expect(pluck('id', nextTodos)).to.deep.equal([2, 1]);
    expect(nextTodos).to.have.lengthOf(2);
    expect(nextNextIdVal).to.equal(3);
  });

  describe('CUD', () => {
    beforeEach(() => {
      setState({
        todos: [
          {
            id: 3,
            title: 'foo',
            completed: false
          },
          {
            id: 2,
            title: 'bar',
            completed: true
          },
          {
            id: 1,
            title: 'baz',
            completed: true
          }
        ],
        nextIdVal: 4
      });
    });

    it('新增項目', () => {
      const { todos, nextIdVal } = dispatch({
        type: APPEND_ITEM,
        payload: { title: 'qux' }
      });
      expect(pluck('id', todos)).to.deep.equal([4, 3, 2, 1]);
      expect(todos[0]).to.deep.equal({
        id: 4,
        title: 'qux',
        completed: false
      });
      expect(todos).to.have.lengthOf(4);
      expect(nextIdVal).to.equal(5);
    });

    it('編輯項目', () => {
      const { todos, nextIdVal } = dispatch({
        type: UPDATE_ITEM,
        payload: { id: 3, title: 'qux', completed: true }
      });
      const target = find(propEq('id', 3))(todos);
      expect(pluck('id', todos)).to.deep.equal([3, 2, 1]);
      expect(target).to.deep.equal({
        id: 3,
        title: 'qux',
        completed: true
      });
      expect(todos).to.have.lengthOf(3);
      expect(nextIdVal).to.equal(4);
    });

    it('移除項目', () => {
      const { todos, nextIdVal } = dispatch({
        type: REMOVE_ITEM,
        payload: { id: 2 }
      });
      expect(pluck('id', todos)).to.deep.equal([3, 1]);
      expect(todos).to.have.lengthOf(2);
      expect(nextIdVal).to.equal(4);
    });
  });
});
