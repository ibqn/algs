/* tslint:disable:no-unused-expression */

import { expect } from 'chai';
import { StdData } from './std-data';


describe('std data tests', () => {
  const content = '1 2 3\n4 5\r\n6 7\n 8 9\n10';

  const stdData = new StdData(content);

  beforeEach(() => {
    stdData.reset();
  });

  it('should be intialized', () => {
    expect(stdData).to.exist;
    expect(stdData.empty()).to.be.false;
    expect(stdData.size()).to.be.equal(10);
  });

  it('test get data', () => {
    for (let i = 1; i <= 10; i ++) {
      expect(stdData.empty()).to.be.false;
      expect(stdData.get()).to.be.equal('' + i);
      expect(stdData.size()).to.be.equal(10 - i);
    }

    expect(stdData.empty()).to.be.true;
  });

});
