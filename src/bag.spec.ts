import { expect } from "chai";
import { Bag } from "./bag";

 describe('bag tests', () => {
  const bag = new Bag<number>();

  it('should be intialized', () => {
    expect(bag).to.exist;
    expect(bag.isEmpty()).to.be.true;
    expect(bag.size()).to.be.equal(0);
  });
 });
