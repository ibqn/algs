#!/usr/bin/env node


const readline = require('readline');
const fs = require('fs')
const yargs = require('yargs');
const chalk = require('chalk');

import { StdData } from '../std-data';


/**
 *  The {@code QuickFindUF} class represents a <em>union–find data type</em>
 *  (also known as the <em>disjoint-sets data type</em>).
 *  It supports the <em>union</em> and <em>find</em> operations,
 *  along with a <em>connected</em> operation for determining whether
 *  two sites are in the same component and a <em>count</em> operation that
 *  returns the total number of components.
 *  <p>
 *  The union–find data type models connectivity among a set of <em>n</em>
 *  sites, named 0 through <em>n</em>–1.
 *  The <em>is-connected-to</em> relation must be an
 *  <em>equivalence relation</em>:
 *  <ul>
 *  <li> <em>Reflexive</em>: <em>p</em> is connected to <em>p</em>.
 *  <li> <em>Symmetric</em>: If <em>p</em> is connected to <em>q</em>,
 *       then <em>q</em> is connected to <em>p</em>.
 *  <li> <em>Transitive</em>: If <em>p</em> is connected to <em>q</em>
 *          and <em>q</em> is connected to <em>r</em>, then
 *          <em>p</em> is connected to <em>r</em>.
 *  </ul>
 *  <p>
 *  An equivalence relation partitions the sites into
 *  <em>equivalence classes</em> (or <em>components</em>). In this case,
 *  two sites are in the same component if and only if they are connected.
 *  Both sites and components are identified with integers between 0 and
 *  <em>n</em>–1.
 *  Initially, there are <em>n</em> components, with each site in its
 *  own component.  The <em>component identifier</em> of a component
 *  (also known as the <em>root</em>, <em>canonical element</em>, <em>leader</em>,
 *  or <em>set representative</em>) is one of the sites in the component:
 *  two sites have the same component identifier if and only if they are
 *  in the same component.
 *  <ul>
 *  <li><em>union</em>(<em>p</em>, <em>q</em>) adds a
 *      connection between the two sites <em>p</em> and <em>q</em>.
 *      If <em>p</em> and <em>q</em> are in different components,
 *      then it replaces
 *      these two components with a new component that is the union of
 *      the two.
 *  <li><em>find</em>(<em>p</em>) returns the component
 *      identifier of the component containing <em>p</em>.
 *  <li><em>connected</em>(<em>p</em>, <em>q</em>)
 *      returns true if both <em>p</em> and <em>q</em>
 *     are in the same component, and false otherwise.
 *  <li><em>count</em>() returns the number of components.
 *  </ul>
 *  <p>
 *  The component identifier of a component can change
 *  only when the component itself changes during a call to
 *  <em>union</em>—it cannot change during a call
 *  to <em>find</em>, <em>connected</em>, or <em>count</em>.
 *  <p>
 *  This implementation uses quick find.
 *  Initializing a data structure with <em>n</em> sites takes linear time.
 *  Afterwards, the <em>find</em>, <em>connected</em>, and <em>count</em>
 *  operations take constant time but the <em>union</em> operation
 *  takes linear time.
 *  For alternate implementations of the same API, see
 *  {@link UF}, {@link QuickUnionUF}, and {@link WeightedQuickUnionUF}.
 *
 *  <p>
 *  For additional documentation, see <a href="http://algs4.cs.princeton.edu/15uf">Section 1.5</a> of
 *  <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 *  @author Robert Sedgewick
 *  @author Kevin Wayne
 */
class QuickFindUF {
  private id: number[];
  private _count: number;

  /**
   * Initializes an empty union–find data structure with {@code n} sites
   * {@code 0} through {@code n-1}. Each site is initially in its own
   * component.
   *
   * @param  n the number of sites
   * @throws Illegal argument exception if {@code n < 0}
   */
  constructor(n: number) {
    this._count = n;
    this.id = new Array(n);

    for(let i = 0; i < n; i++) {
      this.id[i] = i;
    }
  }

  count(): number {
    return this._count;
  }

  find(p: number): number {
    return this.id[p];
  }

  connected(p: number, q: number): boolean {
    return this.id[p] === this.id[q];
  }

  union(p: number, q: number): void {
    const pId = this.id[p];
    const qId = this.id[q];

    if(pId === qId) {
      return;
    }

    for(let i = 0; i < this.id.length; i ++) {
      if(this.id[i] === pId) {
        this.id[i] = qId;
      }
    }
    this._count --;
  }
}

// Main code
const main = function() {
  const argv = yargs
    .usage('Usage: [options]')
    .example('$0 -f tinyUF.txt', 'Loads pairs of integers from file')
    .alias('f', 'file')
    .nargs('f', 1)
    .default('f', 'tinyUF.txt')
    .describe('f', 'Specify file with pairs of integers')
    .demandOption(['f'])
    .help('h')
    .alias('h', 'help')
    .epilog(
      'union–find data type (also known as disjoint-sets data type) example'
    )
    .argv;

  const content = fs.readFileSync(argv.file, {encoding: 'utf8'});
  const stdData = new StdData(content);

  const n = +stdData.get(); // size of the union-find array
  const uf = new QuickFindUF(n);

  console.log(`size of the disjoint-sets data type is ${n}`);

  while(!stdData.empty()) {
    const p = +stdData.get();
    const q = +stdData.get();
    if(uf.connected(p, q)) {
      console.log('.');
      continue;
    }
    uf.union(p, q);
    console.log(p + "--" + q);
  }
  console.log(uf.count() + " components");
}

// Main loop
if (require.main === module) {
  /**
    * Reads in a sequence of pairs of integers (between 0 and n-1) from standard input,
    * where each integer represents some site;
    * if the sites are in different components, merge the two components
    * and print the pair to standard output.
    *
    * @param args the command-line arguments
    */
  main();
}
