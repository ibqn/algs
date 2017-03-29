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
