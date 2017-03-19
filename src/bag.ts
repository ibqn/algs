class Node<Item> {
  item:  Item;
  next: Node<Item>;
}


class NodeIterator<Item> implements IterableIterator<Item> {
  private current: Node<Item>;

  public constructor(first: Node<Item>) {
    this.current = first;
  }

  [Symbol.iterator](): IterableIterator<Item> {
    return this;
  }

  public next(): IteratorResult<Item> {
    const empty = this.current === null;
    let item: Item = null;
    if (!empty) {
      item = this.current.item;
      this.current = this.current.next;
    }
    return {
      done: empty,
      value: item
    };
  }
}


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
}
