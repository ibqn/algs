import { Comparable } from './comparable';
import { less, exch } from './sorting-methods';

import './comparable-string';
import './comparable-number';


export class Insertion {
  static sort<T>(c: Comparable<T>[]): Comparable<T>[] {
    for (let i = 1; i < c.length; i ++) {
      for (let j = i; j > 0 && less<T>(c[j], c[j - 1]); j --) {
        exch<T>(c, j, j - 1);
      }
    }
    return c;
  }

  private constructor() {}
}
