import React from 'react';
import { spy } from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { fetchApi } from '!/effects';
import { Input, states, handlers } from '../input';

describe('sample-todo input testing', () => {
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
      expect(wrapper.props()).to.have.keys('input', 'setInput', 'resetInput');
      expect(wrapper.prop('input')).is.a('string').that.to.be.empty;
      expect(wrapper.prop('setInput')).is.a('function');
      expect(wrapper.prop('resetInput')).is.a('function');
    });

    describe('#setInput', () => {
      it('typing something', () => {
        const setInput = wrapper.prop('setInput');
        setInput({ target: { value: 'foo' } });
        expect(wrapper.prop('input')).to.be.equal('foo');
      });
    });

    describe('#resetInput', () => {
      it('clear input', () => {
        const resetInput = wrapper.prop('resetInput');
        resetInput();
        expect(wrapper.prop('input')).to.be.empty;
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
      expect(wrapper.props()).to.have.keys('loadTodoList', 'keyPressHandler');
    });

    describe('#loadTodoList', () => {
      /* 模擬用到的 props */
      const dispatchSpy = spy();
      before(() => {
        wrapper.setProps({ dispatch: dispatchSpy });
      });

      it('fetch remote', () => {
        const loadTodoList = wrapper.prop('loadTodoList');
        loadTodoList();
        expect(
          fetchApi('API_FETCH_LIST', {
            url: 'http://jsonplaceholder.typicode.com/todos?userId=1'
          })(dispatchSpy.getCall(0).args[0])
        ).to.be.true;
      });
    });

    describe('#keyPressHandler', () => {
      let keyPressHandler,
        dispatchSpy = spy(),
        resetSpy = spy();
      before(() => {
        wrapper.setProps({
          dispatch: dispatchSpy,
          input: '',
          resetInput: resetSpy
        });
        keyPressHandler = wrapper.prop('keyPressHandler');
      });

      afterEach(() => {
        dispatchSpy.reset();
        resetSpy.reset();
        wrapper.setProps({
          input: ''
        });
      });

      it('按下 enter，且 input 有值', () => {
        wrapper.setProps({ input: 'foo' });
        keyPressHandler({ charCode: 13 });

        expect(dispatchSpy.calledOnce).to.be.true;
        expect(resetSpy.calledOnce).to.be.true;
        expect(dispatchSpy.getCall(0).args[0]).to.deep.equal({
          type: 'APPEND_ITEM',
          payload: { title: 'foo' }
        });
      });

      it('其他情況', () => {
        /* input is empty */
        wrapper.setProps({ input: '' });
        keyPressHandler({ charCode: 13 });
        /* press not enter */
        wrapper.setProps({ input: 'foo' });
        keyPressHandler({ charCode: 97 });

        expect(dispatchSpy.calledOnce).to.be.false;
        expect(resetSpy.calledOnce).to.be.false;
      });
    });
  });

  describe('shallow', () => {
    let wrapper,
      inputSpy = spy(),
      loadSpy = spy(),
      pressSpy = spy();
    before(() => {
      wrapper = shallow(
        <Input
          input="foobar"
          setInput={inputSpy}
          loadTodoList={loadSpy}
          keyPressHandler={pressSpy}
        />
      );
    });
    after(() => {
      wrapper = null;
    });

    describe('check elements', () => {
      let inputEl, btnEl;
      before(() => {
        inputEl = wrapper.find('input');
        btnEl = wrapper.find('button');
      });
      it('input element', () => {
        expect(inputEl).to.have.length(1);
        expect(inputEl.node.props.value).to.equal('foobar');
        inputEl.simulate('change');
        expect(inputSpy.calledOnce).to.be.true;
        inputEl.simulate('keyPress');
        expect(pressSpy.calledOnce).to.be.true;
      });

      it('button element', () => {
        expect(btnEl).to.have.length(1);
        btnEl.simulate('click');
        expect(loadSpy.calledOnce).to.be.true;
      });
    });
  });
});
