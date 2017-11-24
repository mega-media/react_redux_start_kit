/* @flow */
import React from 'react';
import { emit } from '~/core/action/effects';
import { REMOVE_ITEM, UPDATE_ITEM } from '~/containers/sample_todo/constant';
import { compose, Dispatch, Style } from '../../core/container';
import { withStateHandlers, withHandlers, setDisplayName } from 'recompose';
import { pipe, trim, isEmpty } from 'ramda';
import Input from './input';
import css from './todo.scss';

export const states = withStateHandlers(
  { modify: false, text: '' },
  {
    modifyToggle: ({ modify }, { data: { title } }) => () => ({
      modify: !modify,
      text: title
    }),
    setText: () => ({ target: { value } }) => ({ text: value })
  }
);

export const handlers = withHandlers(() => {
  return {
    refSelect: () => ref => {
      if (ref) ref.select();
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
});

export const Default = setDisplayName('Default')(
  ({
    data: { title, completed },
    completedToggle,
    removeHandler,
    modifyToggle
  }: Object) => (
    <tr styleName={completed ? 'completed' : ''}>
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
  )
);

export const Modify = setDisplayName('Modify')(
  ({ updateHandler, modifyToggle, text, setText, refSelect }: Object) => (
    <tr>
      <td styleName="item" colSpan={3}>
        <input
          type="text"
          ref={refSelect}
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
  )
);

export const Item = ({ modify, ...others }: Object) =>
  modify ? <Modify {...others} /> : <Default {...others} />;

export default compose(
  setDisplayName('Item'),
  Dispatch,
  states,
  handlers,
  Style(css)
)(Item);
