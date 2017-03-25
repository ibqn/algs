import { Comparable } from './comparable';

declare global {
  interface String extends Comparable {
    compareTo(a: Comparable): number;
  }
}

String.prototype.compareTo = function(a: string): number {
  if (this === a) {
    return 0;
  } else if (this > a) {
    return 1;
  } else {
    return -1;
  }
};
