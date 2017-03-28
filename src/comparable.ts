export interface Comparable<T> {
  compareTo(a: Comparable<T>): number;
}
