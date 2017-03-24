import { Comparable } from '../comparable';

import '../comparable-number';


const f = (c: Comparable) => {
  console.log(c);
};



let a = 3;
console.log(a.compareTo(4));
f(a);
