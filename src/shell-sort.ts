import * as math from 'mathjs';
import { Comparable } from './comparable';
import { less, exch } from './sorting-methods';

import './comparable-string';
import './comparable-number';


export class Shell {
  static sort<T>(c: Comparable<T>[]): Comparable<T>[] {
    const n = c.length;

    // 3x+1 increment sequence:  1, 4, 13, 40, 121, 364, 1093, ...
    let h = 1;
    while (h < math.floor(n / 3)) {
      h = 3 * h + 1;
    }

    while (h >= 1) {
      // h-sort the array
      for (let i = h; i < n; i ++) {
        for (let j = i; j >= h && less<T>(c[j], c[j - h]); j -= h) {
          exch<T>(c, j, j - h);
        }
      }
      h = math.floor(h / 3);
    }
    return c;
  }

  private constructor() {}
}
