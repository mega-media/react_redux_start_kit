/* @flow */
import React from 'react';
import { fetchAPI, emit } from '~/core/action/effects';
import { APPEND_ITEM } from '~/containers/sample_todo/constant';
import { compose, Dispatch, Style } from '../../core/container';
import { withHandlers, withStateHandlers } from 'recompose';
import { pipe, trim, isEmpty } from 'ramda';
import css from './todo.scss';

export default compose(
  Dispatch,
  withStateHandlers(
    { input: '' },
    {
      setInput: () => ({ target: { value } }) => ({ input: value }),
      resetInput: () => () => ({ input: '' })
    }
  ),
  withHandlers({
    loadTodoList: ({ dispatch }) => () => {
      dispatch(
        fetchAPI('SAVE_LIST', {
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
  }),
  Style(css)
)(({ input, setInput, loadTodoList, keyPressHandler }) =>
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
