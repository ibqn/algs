import { Comparable } from './comparable';

import './comparable-string';
import './comparable-number';


export function less<T>(v: Comparable<T>, w: Comparable<T>): boolean {
  return v.compareTo(w) < 0;
}

export function exch<T>(v: Comparable<T>[], i: number, j: number): void {
  const swap: Comparable<T> = v[i];
  v[i] = v[j];
  v[j] = swap;
}

export function show<T>(v: Comparable<T>[]): void {
  for (let e of v) {
    console.log(e);
  }
}


// is the array sorted from a[lo] to a[hi]
export function sorted<T>(v: Comparable<T>[], one?: number, two?: number): boolean {
  let lo = 0;
  let hi = v.length - 1;

  if (two) {
    hi = two;
    lo = one;
  } else {
    if (one) {
      hi = one;
    }
  }

  for (let i = lo + 1; i <= hi; i ++) {
    if (less<T>(v[i], v[i - 1])) {
      return false;
    }
  }
  return true;
}

// partition the subarray a[lo..hi] so that a[lo..j-1] <= a[j] <= a[j+1..hi]
// and return the index j.
export function partition<T>(v: Comparable<T>[], lo: number, hi: number): number {
  let i = lo;
  let j = hi + 1;
  let k: Comparable<T> = v[lo];
  while (true) {
    // find item on lo to swap
    while (less<T>(v[++i], k)) {
      if (i === hi) { break; }
    }
    // find item on hi to swap
    while (less<T>(k, v[--j])) {
      if (j === lo) { break; } // redundant since a[lo] acts as sentinel
    }
    // check if pointers cross
    if (i >= j) { break; }
    exch<T>(v, i, j);
  }
  // put partitioning item v at a[j]
  exch<T>(v, lo, j);
  // now, v[lo .. j-1] <= v[j] <= v[j+1 .. hi]
  return j;
}
