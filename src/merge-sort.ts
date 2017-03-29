import * as math from 'mathjs';

import { Comparable } from './comparable';
import { less, exch } from './sorting-methods';


export class Merge {
  static sort<T>(c: Comparable<T>[]): Comparable<T>[] {
    let aux: Comparable<T>[] = new Array(c.length);
    Merge.aux_sort<T>(c, aux, 0, c.length - 1);
    return c;
  }

  private static aux_sort<T>(
    c: Comparable<T>[],
    aux: Comparable<T>[],
    lo: number,
    hi: number
  ): void {
  }

  private constructor() {}
}
