/**
 * TDD style 使用 assert
 * 參考：http://chaijs.com/api/assert/
 * @flow
 */
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import Demo from '../';

describe('TDD', () => {
  let wrapper: any, instance: any;
  before(() => {
    wrapper = shallow(<Demo />);
    instance = wrapper.instance();
  });

  describe('#sum', () => {
    it('數值加總', () => {
      assert.equal(instance.sum(2, 3), 5, '加總結果應為 5');
      assert.equal(instance.sum(10, 21), 31, '加總結果應為 31');
      const rnd = parseInt(Math.random() * 100 + 1);
      assert.equal(instance.sum(50, rnd), rnd + 50, `加總結果應為 ${rnd + 50}`);
    });
  });

  describe('#doubleSum', () => {
    /**
     * 函式中若有使用到外部函式，需建立外部函式模擬，並假設該函式執行結果為正確
     * sinon: http://sinonjs.org/releases/v2.4.1/stubs
     */
    let sumStub;
    before(() => {
      /* 建立 stub 模擬 #sum */
      sumStub = sinon.stub(instance, 'sum');
    });

    afterEach(() => {
      /* 每次 it 完需要重置 */
      sumStub.reset();
    });

    after(() => {
      /* 測試完記得釋放 stub 內存 */
      sumStub.restore();
    });

    it('雙倍加總 sample 1.', () => {
      /* 假設 sumStub 執行結果是正確的 */
      sumStub.withArgs(2, 3).returns(5);
      sumStub.withArgs(5, 5).returns(10);

      assert.equal(instance.doubleSum(2, 3), 10);
      assert.isTrue(sumStub.withArgs(2, 3).calledTwice);
      assert.isTrue(sumStub.withArgs(5, 5).calledOnce);
    });

    it('雙倍加總 sample 2.', () => {
      /* 假設 sumStub 執行結果是正確的 */
      sumStub.withArgs(21, 56).returns(77);
      sumStub.withArgs(77, 77).returns(154);

      assert.equal(instance.doubleSum(21, 56), 154);
      assert.isTrue(sumStub.withArgs(21, 56).calledTwice);
      assert.isTrue(sumStub.withArgs(77, 77).calledOnce);
    });
  });
});
