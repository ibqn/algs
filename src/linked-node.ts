export class Node<Item> {
  item:  Item;
  next: Node<Item>;
}


export class NodeIterator<Item> implements IterableIterator<Item> {
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
