/* tslint:disable:no-unused-expression */

import { expect } from 'chai';
import { Queue } from './queue';


describe('queue tests', () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue<number>();
  });

  it('should be intialized', () => {
    expect(queue).to.exist;
    expect(queue.isEmpty()).to.be.true;
    expect(queue.size()).to.be.equal(0);
  });

  it('should be iterable', () => {
    const a = [1, 2, 3, 4, 5];
    a.forEach(n => queue.enqueue(n));

    for (let el of queue) {
      expect(el).to.be.oneOf(a);
    }

    expect(queue.size()).to.be.equal(a.length);
    expect(queue.isEmpty()).to.be.false;
  });

  it('should verify enqueue and dequeue', () => {

  });
});
