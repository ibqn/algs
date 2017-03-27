import { expect } from 'chai';

import { Comparable } from './comparable';
import './comparable-string';
import './comparable-number';


import { sorted, less, exch } from './sorting-methods';

describe('sorting methods', () => {
  const letters = 'S O R T E X A M P L E'.split(' ');
  const numbers = [10, 6, 7, 8, 9, 5, 4, 3, 2, 1];

  it('test less', () => {
    expect(less(7, 9)).to.be.true;
    numbers.forEach(i => {
      expect(less(11, i)).to.be.false;
    });

    expect(less('B', 'F')).to.be.true;
    letters.forEach(l => {
      expect(less('Y', l)).to.be.false;
    });
  });

  it('test sorted', () => {
    expect(sorted(letters)).to.be.false;
    expect(sorted([3, 13, 55, 77])).to.be.true;
    expect(sorted(letters, 1, 3)).to.be.true;

    expect(sorted(numbers)).to.be.false;
    expect(sorted(['C', 'D', 'G', 'W'])).to.be.true;
    expect(sorted(numbers, 1, 4)).to.be.true;
  });

});
