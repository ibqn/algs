/* tslint:disable:no-unused-expression */

import { expect } from 'chai';
import { BinarySearch } from './binary-search';


describe('binary seach tests', () => {
  let a = [1, 10, 9, 2, 22, 8, 7, 3, 4, 5, 6];
  // sort test array numerically
  a = a.sort((i, j) => i - j);
  const bs = BinarySearch.indexOf;

  it('should match', () => {
    a.forEach(i => {
      const n = bs(a, i);
      expect(n).to.exist;
      expect(n).to.be.within(0, a.length - 1);
      expect(a[n]).to.be.equal(i);
    });
  });

  it('should not match', () => {
    [99, -1, 0].forEach(i => {
      const n = bs(a, i);
      expect(n).to.exist;
      expect(n).to.be.equal(-1);
    });
  });
});
