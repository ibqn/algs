import { expect } from "chai";
import { Bag } from "./bag";

 describe('bag tests', () => {
  it('should be intialized', () => {
    let bag = new Bag<number>();
    expect(bag).to.exist;
    expect(bag.isEmpty()).to.be.true;
    expect(bag.size()).to.be.equal(0);
  });
 });
