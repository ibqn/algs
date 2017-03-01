class Node<Item> {
  item:  Item;
  next: Node<Item>;
}


export class Bag<Item> {
  private first: Node<Item>;    // beginning of bag
  private n: number;            // number of elements in bag

  constructor() {
    this.first = null;
    this.n = 0;
  }

  isEmpty(): boolean {
    return this.first === null;
  }

  size(): number {
    return this.n;
  }

  add(item: Item) {
    let oldfirst = this.first;
    this.first = new Node<Item>();
    this.first.item = item;
    this.first.next = oldfirst;
    this.n++;
  }
}
