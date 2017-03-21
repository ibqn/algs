import { expect } from 'chai';
import { Stack } from './stack';


describe('stack tests', () => {
  const stack = new Stack<number>();

  it('should be intialized', () => {
    expect(stack).to.exist;
    expect(stack.isEmpty()).to.be.true;
    expect(stack.size()).to.be.equal(0);
  });

  it('should be iterable', () => {
    const a = [1, 2, 3, 4, 5];
    a.forEach(n => stack.push(n));

    for (let el of stack) {
      expect(el).to.be.oneOf(a);
    }

    expect(stack.size()).to.be.equal(a.length);
    expect(stack.isEmpty()).to.be.false;
  });
});
