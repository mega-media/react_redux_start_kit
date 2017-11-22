/* @flow */
import React from 'react';
import { emit } from '~/core/action/effects';
import { REMOVE_ITEM, UPDATE_ITEM } from '~/containers/sample_todo/constant';
import { compose, Dispatch, Style } from '../../core/container';
import { withStateHandlers, withHandlers } from 'recompose';
import { pipe, trim, isEmpty } from 'ramda';
import Input from './input';
import css from './todo.scss';

export default compose(
  Dispatch,
  withStateHandlers(
    { modify: false, text: '' },
    {
      modifyToggle: (
        { modify },
        { data: { title }, refInput, focusRef }
      ) => () => ({
        modify: !modify,
        text: title
      }),
      setText: () => ({ target: { value } }) => ({ text: value })
    }
  ),
  withHandlers(() => {
    return {
      refFocus: () => ref => {
        if (ref) ref.focus();
      },

      completedToggle: ({ dispatch, data: { id, title, completed } }) => () => {
        dispatch(emit(UPDATE_ITEM, { id, title, completed: !completed }));
      },

      updateHandler: ({
        dispatch,
        text,
        modifyToggle,
        data: { id, completed }
      }) => ({ charCode }) => {
        if (charCode === 13 && !pipe(trim, isEmpty)(text)) {
          dispatch(emit(UPDATE_ITEM, { id, title: text, completed }));
          modifyToggle();
        }
      },

      removeHandler: ({ dispatch, data: { id } }) => () => {
        dispatch(emit(REMOVE_ITEM, { id }));
      }
    };
  }),
  Style(css)
)(
  ({
    data: { id, title, completed },
    completedToggle,
    updateHandler,
    removeHandler,
    modifyToggle,
    modify,
    text,
    setText,
    refFocus
  }) =>
    modify
      ? <tr>
          <td styleName="item" colSpan={3}>
            <input
              type="text"
              ref={refFocus}
              styleName="form-control"
              value={text}
              onChange={setText}
              onKeyPress={updateHandler}
            />
            <div styleName="modify-cancel" onClick={modifyToggle}>
              <i styleName="glyphicon glyphicon-remove" />
            </div>
          </td>
        </tr>
      : <tr styleName={completed ? 'completed' : ''}>
          <td styleName="item" onClick={modifyToggle}>
            {title}
          </td>
          <td styleName="complete" onClick={completedToggle}>
            <i styleName="glyphicon glyphicon-ok" />
          </td>
          <td styleName="remove" onClick={removeHandler}>
            <i styleName="glyphicon glyphicon-trash" />
          </td>
        </tr>
);
