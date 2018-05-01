/* @flow */
import React from 'react';
import { fetchAPI, emit } from '~/core/action/effects';
import { APPEND_ITEM, API_FETCH_LIST } from '~/containers/sample_todo/constant';
import { compose, withDispatch, withStyle } from '../../core/container';
import { withHandlers, withStateHandlers, setDisplayName } from 'recompose';
import { pipe, trim, isEmpty } from 'ramda';
import css from './todo.scss';

export const states = withStateHandlers(
  { input: '' },
  {
    setInput: () => ({ target: { value } }) => ({ input: value }),
    resetInput: () => () => ({ input: '' })
  }
);

export const handlers = withHandlers({
  loadTodoList: ({ dispatch }) => () => {
    dispatch(
      fetchAPI(API_FETCH_LIST, {
        url: 'http://jsonplaceholder.typicode.com/todos?userId=1'
      })
    );
  },

  keyPressHandler: ({ dispatch, input, resetInput }) => ({ charCode }) => {
    if (charCode === 13 && !pipe(trim, isEmpty)(input)) {
      dispatch(emit(APPEND_ITEM, { title: input }));
      resetInput();
    }
  }
});

export const Input = ({
  input,
  setInput,
  loadTodoList,
  keyPressHandler
}: Object) => (
  <div styleName="input-group">
    <input
      type="text"
      styleName="form-control"
      placeholder="need to do"
      onChange={setInput}
      onKeyPress={keyPressHandler}
      value={input}
    />
    <span styleName="input-group-btn">
      <button styleName="btn btn-default" type="button" onClick={loadTodoList}>
        載入紀錄
      </button>
    </span>
  </div>
);

export default compose(
  setDisplayName('Input'),
  withDispatch,
  states,
  handlers,
  withStyle(css)
)(Input);
