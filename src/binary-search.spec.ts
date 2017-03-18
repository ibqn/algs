import { expect } from 'chai';
import { BinarySearch } from './binary-search';

describe('binary seach tests', () => {
  let a = [1, 10, 9, 2, 22, 8, 7, 3, 4, 5, 6];
  // sort test array numerically
  a = a.sort((i, j) => i - j);
  let bs = BinarySearch.indexOf;

  it('functionaly verification', () => {
    a.forEach(i => {
      const n = bs(a, i);
      expect(n).to.be.not.equal(-1);
      expect(a[n]).to.be.equal(i);
    });
    const tt = bs(a, 22);
    expect(tt).to.be.not.equal(-1);
    expect(a[tt]).to.be.equal(22);
  });
});
