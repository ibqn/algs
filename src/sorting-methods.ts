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
