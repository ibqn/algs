import { Comparable } from './comparable';

declare global {
  interface Number extends Comparable<number> {
    compareTo(a: Comparable<number>): number;
  }
}

Number.prototype.compareTo = function(a: number): number {
  return this - a;
};
