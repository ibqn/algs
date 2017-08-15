/* tslint:disable:no-unused-expression */

import { expect } from 'chai';

import { Comparable } from './comparable';
import { sorted, less, partition, merge } from './sorting-methods';
import { StdRandom } from './std-random';


describe('sorting methods', () => {
  let letters: string[];
  let numbers: number[];

  beforeEach(() => {
    letters = 'S O R T E X A M P L E'.split(' ');
    numbers = [10, 6, 7, 8, 9, 5, 4, 3, 2, 1];
  });

  it('test less', () => {
    expect(less(7, 9)).to.be.true;
    numbers.forEach(i => {
      expect(less<number>(11, i)).to.be.false;
    });

    expect(less<string>('B', 'F')).to.be.true;
    letters.forEach(l => {
      expect(less('Y', l)).to.be.false;
    });
  });

  it('test sorted', () => {
    expect(sorted(letters)).to.be.false;
    expect(sorted<number>([3, 13, 55, 77])).to.be.true;

    expect(sorted(numbers)).to.be.false;
    expect(sorted<string>(['C', 'D', 'G', 'W'])).to.be.true;
    expect(sorted(numbers, 1, 4)).to.be.true;
  });

  it('test sorted with range', () => {
    expect(sorted([3, 4, 5, 1], 2)).to.be.true;
    expect(sorted(letters, 1, 3)).to.be.true;
  });

  it('test partition', () => {
    const num = StdRandom.shuffle<number>(numbers);

    const p: number = partition(num, 0, num.length - 1);
    expect(p).to.exist;
    expect(p).to.be.within(0, num.length - 1);
    // now, v[lo .. p-1] <= v[p] <= v[p+1 .. hi]
    for (let i = 0; i < p; i ++) {
      expect(less(num[i], num[p])).to.be.true;
    }
    for (let i = p + 1; i < num.length; i ++) {
      expect(less(num[p], num[i])).to.be.true;
    }
  });

  it('test merge function', () => {
    let one = [3, 5, 7, 9, 15],
        two = [1, 4, 6, 8, 9, 12, 13];
    let arr: Comparable<number>[] = one.concat(two);
    let aux: Comparable<number>[] = new Array(arr.length);
    arr = merge<number>(arr, aux, 0, one.length - 1, arr.length - 1);
    expect(sorted(arr)).to.be.true;

    arr = two.concat(one);
    arr = merge<number>(arr, aux, 0, two.length - 1, arr.length - 1);
    expect(sorted(arr)).to.be.true;
  });

});
