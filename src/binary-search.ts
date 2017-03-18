import * as math from 'mathjs';


export class BinarySearch {
  static indexOf(a: number[], val: number): number {
    let lo = 0;
    let hi = a.length - 1;
    let mid: number;
    while (lo <= hi) {
      mid = math.floor((hi + lo) / 2);
      if (val < a[mid]) {
        hi = mid - 1;
      } else if (val > a[mid]) {
        lo = mid + 1;
      } else {
        return mid;
      }
    }
    return -1;
  }

  private constructor() {}
}
