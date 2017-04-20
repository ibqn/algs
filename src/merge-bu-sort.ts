import * as math from 'mathjs';

import { Comparable } from './comparable';
import { merge } from './sorting-methods';


export class MergeBU {
  // Rearranges the array in ascending order, using the natural order.
  static sort<T>(c: Comparable<T>[]): Comparable<T>[] {
    let N: number = c.length;
    let aux: Comparable<T>[] = new Array(N);
    for (let s = 1; s < N; s += s) {
      for (let lo = 0; lo < N - s; lo += s + s) {
        merge<T>(c, aux, lo, lo + s - 1, math.min(lo + s + s, N) - 1);
      }
    }
    return c;
  }

  private constructor() {}
}
