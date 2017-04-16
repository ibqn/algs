/* tslint:disable:no-unused-expression */

import { expect } from 'chai';

import { Comparable } from './comparable';
import { Merge } from './merge-sort';
import { sorted, show } from './sorting-methods';

describe('merge sort', () => {
  const letters = 'S O R T E X A M P L E'.split(' ');
  const numbers = [10, 6, 7, 8, 9, 5, 4, 3, 2, 1];

  it('letters should be sorted', () => {
    const n = letters.length;
    Merge.sort<string>(letters);
    expect(letters.length).to.be.equal(n);
    expect(sorted(letters)).to.be.true;
  });

  it('numbers should be sorted', () => {
    const n = numbers.length;
    Merge.sort<number>(numbers);
    expect(numbers.length).to.be.equal(n);
    expect(sorted<number>(numbers)).to.be.true;
  });

});
