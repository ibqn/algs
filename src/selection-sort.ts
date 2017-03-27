import { Comparable } from './comparable';
import { less, exch } from './sorting-methods';


export class Selection {
  static sort(c: Comparable[]): Comparable[] {
    const n = c.length;
    for (let i = 0; i < n; i ++) {
      let min = i;
      for (let j = i + 1; j < n; j ++) {
        if (less(c[j], c[min])) {
          min = j;
        }
      }
      exch(c, i, min);
    }
    return c;
  }

  private constructor() {}
}
