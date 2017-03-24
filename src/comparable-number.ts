import { Comparable } from './comparable';

declare global {
  interface Number extends Comparable {
    compareTo(a: Comparable): number;
  }
}

Number.prototype.compareTo = function(a: number): number {
  return this - a;
};
