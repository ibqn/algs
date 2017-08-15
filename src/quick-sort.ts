import { Comparable } from './comparable';
import { partition } from './sorting-methods';
import { StdRandom } from './std-random';



export class Quick {
  // Rearranges the array in ascending order, using the natural order.
  static sort<T>(c: Comparable<T>[]): Comparable<T>[] {
    const r = StdRandom.shuffle<Comparable<T>>(c);
    Quick.aux_sort<T>(r, 0, r.length - 1);
    return r;
  }

  private static aux_sort<T>(c: Comparable<T>[], lo: number, hi: number): void {
    if (hi <= lo) {
      return;
    }
    const mid = partition(c, lo, hi);
    Quick.aux_sort<T>(c, lo, mid - 1);
    Quick.aux_sort<T>(c, mid + 1, hi);
  }

  private constructor() {}
}
