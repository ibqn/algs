import { Comparable } from './comparable';
import { less, exch } from './sorting-methods';


export class Insertion {
  static sort(c: Comparable[]): Comparable[] {
    for (let i = 1; i < c.length; i ++) {
      for (let j = i; j > 0 && less(c[j], c[j - 1]); j --) {
        exch(c, j, j - 1);
      }
    }
    return c;
  }

  private constructor() {}
}
