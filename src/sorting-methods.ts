import { Comparable } from './comparable';


export function less(v: Comparable, w: Comparable): boolean {
  return v.compareTo(w) < 0;
}

export function exch(v: Comparable[], i: number, j: number): void {
  const swap: Comparable = v[i];
  v[i] = v[j];
  v[j] = swap;
}

export function show(v: Comparable[]): void {
  for (let e of v) {
    console.log(e);
  }
}


// is the array sorted from a[lo] to a[hi]
export function sorted(v: Comparable[], one?: number, two?: number): boolean {
  let lo = 1;
  let hi = v.length;

  if (two) {
    hi = two;
    lo = one;
  } else {
    if (one) {
      hi = one;
    }
  }

  for (let i = lo; i < hi; i ++) {
    if (less(v[i], v[i - 1])) {
      return false;
    }
  }
  return true;
}
