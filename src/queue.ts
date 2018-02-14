import { Node, NodeIterator } from './linked-node';


export class Queue<Item> implements Iterable<Item> {
  private first: Node<Item>;
  private last: Node<Item>;
  private n: number;

  constructor() {
    this.first = null;
    this.last = null;
    this.n = 0;
  }

  [Symbol.iterator](): IterableIterator<Item> {
    return new NodeIterator<Item>(this.first);
  }

  isEmpty = (): boolean => this.first === null;

  size = (): number => this.n;

  enqueue(item: Item): void {
    const oldlast = this.last;
    this.last = new Node<Item>();
    this.last.item = item;
    this.last.next = null;
    if (this.isEmpty()) {
      this.first = this.last;
    } else {
      oldlast.next = this.last;
    }
    this.n++;
  }

  dequeue(): Item {
    if (this.isEmpty()) {
      throw new Error('Queue underflow');
    }
    const item = this.first.item;
    this.first = this.first.next;
    this.n--;
    // to avoid loitering
    if (this.isEmpty()) {
      this.last = null;
    }
    return item;
  }

  public toString = (): string => {
    let s = '';
    for (let item of this) {
      s += `${item} `;
    }
    return s;
  }
}
