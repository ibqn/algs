import { Node, NodeIterator } from './linked-node';


export class Bag<Item> implements Iterable<Item> {
  private first: Node<Item>;    // beginning of bag
  private n: number;            // number of elements in bag

  constructor() {
    this.first = null;
    this.n = 0;
  }

  [Symbol.iterator](): IterableIterator<Item> {
    return new NodeIterator<Item>(this.first);
  }

  isEmpty(): boolean {
    return this.first === null;
  }

  size(): number {
    return this.n;
  }

  add(item: Item) {
    const oldfirst = this.first;
    this.first = new Node<Item>();
    this.first.item = item;
    this.first.next = oldfirst;
    this.n++;
  }

  public toString = (): string => {
    let s = '';
    for (let item of this) {
      s += `${item} `;
    }
    return s;
  }
}
