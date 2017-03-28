import { Comparable } from './comparable';
import { less, exch } from './sorting-methods';


export class Selection {
  static sort<T>(c: Comparable<T>[]): Comparable<T>[] {
    const n = c.length;
    for (let i = 0; i < n; i ++) {
      let min = i;
      for (let j = i + 1; j < n; j ++) {
        if (less<T>(c[j], c[min])) {
          min = j;
        }
      }
      exch<T>(c, i, min);
    }
    return c;
  }

  private constructor() {}
}
