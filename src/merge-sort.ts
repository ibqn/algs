import * as math from 'mathjs';

import { Comparable } from './comparable';
import { merge } from './sorting-methods';


export class Merge {
  // Rearranges the array in ascending order, using the natural order.
  static sort<T>(c: Comparable<T>[]): Comparable<T>[] {
    let aux: Comparable<T>[] = new Array(c.length);
    Merge.aux_sort<T>(c, aux, 0, c.length - 1);
    return c;
  }

  private static aux_sort<T>(c: Comparable<T>[], aux: Comparable<T>[], lo: number, hi: number): void {
    if (hi <= lo) {
      return;
    }
    const mid = math.floor((hi + lo) / 2);
    Merge.aux_sort<T>(c, aux, lo, mid);
    Merge.aux_sort<T>(c, aux, mid + 1, hi);
    merge<T>(c, aux, lo, mid, hi);
  }

  private constructor() {}
}
