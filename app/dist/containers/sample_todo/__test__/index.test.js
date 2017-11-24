import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Index } from '../index';

describe('sample-todo index testing', () => {
  let wrapper: any;
  before(() => {
    wrapper = shallow(
      <Index
        storeData={{
          todos: [
            { id: 3, title: 'foo', completed: false },
            { id: 2, title: 'bar', completed: true },
            { id: 1, title: 'baz', completed: true }
          ]
        }}
      />
    );
  });

  after(() => {
    wrapper = null;
  });

  it('shallow', () => {
    expect(wrapper.find('Input')).to.have.length(1);
    expect(wrapper.find('Item')).to.have.length(3);
    expect(
      wrapper
        .find('Item')
        .at(0)
        .prop('data')
    ).to.deep.equal({
      id: 3,
      title: 'foo',
      completed: false
    });
  });
});
