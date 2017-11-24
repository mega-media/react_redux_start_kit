import React from 'react';
import { spy } from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Item, Default, Modify, states, handlers } from '../item';

describe('sample-todo item testing', () => {
  const Component = () => <div />;

  describe('states', () => {
    let wrapper;
    before(() => {
      const MockComponent = states(Component);
      wrapper = shallow(<MockComponent />);
    });
    after(() => {
      wrapper = null;
    });

    it('check state content', () => {
      expect(wrapper.props()).to.have.keys(
        'modify',
        'text',
        'modifyToggle',
        'setText'
      );
      expect(wrapper.prop('text')).is.a('string').that.to.be.empty;
      expect(wrapper.prop('modify')).is.a('boolean').that.to.be.false;
      expect(wrapper.prop('modifyToggle')).is.a('function');
      expect(wrapper.prop('setText')).is.a('function');
    });

    describe('#modifyToggle', () => {
      let modifyToggle;
      before(() => {
        modifyToggle = wrapper.prop('modifyToggle');
        wrapper.setProps({ data: { title: 'foobar' } });
      });

      it('toggle', () => {
        modifyToggle();
        expect(wrapper.prop('modify')).to.be.true;
        expect(wrapper.prop('text')).to.equal('foobar');
      });

      it('toggle again', () => {
        modifyToggle();
        expect(wrapper.prop('modify')).to.be.false;
      });
    });

    describe('#setText', () => {
      it('input value', () => {
        const setText = wrapper.prop('setText');
        setText({ target: { value: 'baz' } });
        expect(wrapper.prop('text')).to.be.equal('baz');
      });
    });
  });

  describe('handlers', () => {
    let wrapper;
    before(() => {
      const MockComponent = handlers(Component);
      wrapper = shallow(<MockComponent />);
    });
    after(() => {
      wrapper = null;
    });

    it('check handlers', () => {
      expect(wrapper.props()).to.have.keys(
        'refSelect',
        'completedToggle',
        'updateHandler',
        'removeHandler'
      );
    });

    describe('#completedToggle', () => {
      let dispatchSpy = spy(),
        completedToggle;

      before(() => {
        /* 模擬用到的 props */
        wrapper.setProps({
          dispatch: dispatchSpy,
          data: { id: 1, title: 'foobar', completed: true }
        });
        completedToggle = wrapper.prop('completedToggle');
      });

      it('click toggle', () => {
        completedToggle();
        const { payload: { type, payload } } = dispatchSpy.getCall(0).args[0];
        expect(dispatchSpy.calledOnce).to.be.true;
        expect(type).to.be.equal('UPDATE_ITEM');
        expect(payload).to.be.deep.equal({
          id: 1,
          title: 'foobar',
          completed: false
        });
      });
    });

    describe('#removeHandler', () => {
      /* 模擬用到的 props */
      let dispatchSpy = spy(),
        removeHandler;
      before(() => {
        wrapper.setProps({
          dispatch: dispatchSpy,
          data: { id: 1 }
        });
        removeHandler = wrapper.prop('removeHandler');
      });
      it('remove item', () => {
        removeHandler();
        const { payload: { type, payload } } = dispatchSpy.getCall(0).args[0];
        expect(dispatchSpy.calledOnce).to.be.true;
        expect(type).to.be.equal('REMOVE_ITEM');
        expect(payload).to.be.deep.equal({ id: 1 });
      });
    });

    describe('#updateHandler', () => {
      let updateHandler,
        dispatchSpy = spy(),
        toggleSpy = spy();
      before(() => {
        wrapper.setProps({
          dispatch: dispatchSpy,
          text: '',
          modifyToggle: toggleSpy,
          data: { id: 1, completed: false }
        });
        updateHandler = wrapper.prop('updateHandler');
      });

      afterEach(() => {
        dispatchSpy.reset();
        toggleSpy.reset();
        wrapper.setProps({
          text: ''
        });
      });

      it('按下 enter，且 input 有值', () => {
        wrapper.setProps({ text: 'foo' });
        updateHandler({ charCode: 13 });

        expect(dispatchSpy.calledOnce).to.be.true;
        expect(toggleSpy.calledOnce).to.be.true;
        const { payload: { type, payload } } = dispatchSpy.getCall(0).args[0];
        expect(type).to.be.equal('UPDATE_ITEM');
        expect(payload).to.be.deep.equal({
          id: 1,
          title: 'foo',
          completed: false
        });
      });

      it('其他情況', () => {
        /* input is empty */
        wrapper.setProps({ text: '' });
        updateHandler({ charCode: 13 });
        /* press not enter */
        wrapper.setProps({ text: 'foo' });
        updateHandler({ charCode: 97 });

        expect(dispatchSpy.calledOnce).to.be.false;
        expect(toggleSpy.calledOnce).to.be.false;
      });
    });
  });

  describe('item', () => {
    let wrapper;
    before(() => {
      wrapper = shallow(<Item />);
    });
    after(() => {
      wrapper = null;
    });

    describe('default template', () => {
      let wrapper,
        modifySpy = spy(),
        completedSpy = spy(),
        removeSpy = spy();
      before(() => {
        wrapper = shallow(
          <Default
            {...{
              data: { title: 'foobar', completed: true },
              completedToggle: completedSpy,
              removeHandler: removeSpy,
              modifyToggle: modifySpy
            }}
          />
        );
      });
      after(() => {
        wrapper = null;
      });

      it('check elements content', () => {
        expect(wrapper.find('td')).to.have.length(3);
        expect(
          wrapper.findWhere(n => n.prop('styleName') === 'item').text()
        ).to.equal('foobar');
        expect(
          wrapper
            .findWhere(n => n.prop('styleName') === 'complete')
            .find('i')
            .prop('styleName')
        ).to.equal('glyphicon glyphicon-ok');
        expect(
          wrapper
            .findWhere(n => n.prop('styleName') === 'remove')
            .find('i')
            .prop('styleName')
        ).to.equal('glyphicon glyphicon-trash');
      });

      it('check elements event', () => {
        wrapper
          .findWhere(n => n.prop('styleName') === 'item')
          .simulate('click');
        expect(modifySpy.calledOnce).to.be.true;
        wrapper
          .findWhere(n => n.prop('styleName') === 'complete')
          .simulate('click');
        expect(completedSpy.calledOnce).to.be.true;
        wrapper
          .findWhere(n => n.prop('styleName') === 'remove')
          .simulate('click');
        expect(removeSpy.calledOnce).to.be.true;
      });
    });

    describe('modify template', () => {
      let wrapper,
        modifySpy = spy(),
        updateSpy = spy(),
        setSpy = spy();
      before(() => {
        wrapper = shallow(
          <Modify
            {...{
              updateHandler: updateSpy,
              modifyToggle: modifySpy,
              text: 'foobar',
              setText: setSpy,
              refSelect: spy()
            }}
          />
        );
      });
      after(() => {
        wrapper = null;
      });

      it('check elements content', () => {
        const inputEl = wrapper.find('input');
        expect(inputEl).to.have.length(1);
        expect(inputEl.prop('value')).to.equal('foobar');
        expect(
          wrapper.findWhere(n => n.prop('styleName') === 'modify-cancel')
        ).to.have.length(1);
      });

      it('check elements event', () => {
        wrapper.find('input').simulate('change');
        expect(setSpy.calledOnce).to.be.true;
        wrapper
          .findWhere(n => n.prop('styleName') === 'modify-cancel')
          .simulate('click');
        expect(modifySpy.calledOnce).to.be.true;
      });
    });

    describe('default mode', () => {
      it('show default template', () => {
        wrapper.setProps({ modify: false });
        expect(wrapper.find('Modify')).to.have.length(0);
        expect(wrapper.find('Default')).to.have.length(1);
      });
    });

    describe('modify mode', () => {
      it('show modify template', () => {
        wrapper.setProps({ modify: true });
        expect(wrapper.find('Modify')).to.have.length(1);
        expect(wrapper.find('Default')).to.have.length(0);
      });
    });
  });
});
