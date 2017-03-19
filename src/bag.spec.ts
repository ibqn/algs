import { expect } from 'chai';
import { Bag } from './bag';


describe('bag tests', () => {
  const bag = new Bag<number>();

  it('should be intialized', () => {
    expect(bag).to.exist;
    expect(bag.isEmpty()).to.be.true;
    expect(bag.size()).to.be.equal(0);
  });

  it('should be iterable', () => {
    const a = [1, 2, 3, 4, 5];
    a.forEach(n => bag.add(n));

    for (let el of bag) {
      expect(el).to.be.oneOf(a);
    }

    expect(bag.size()).to.be.equal(a.length);
    expect(bag.isEmpty()).to.be.false;
  });
});
