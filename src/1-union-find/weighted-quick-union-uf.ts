import * as readline from 'readline';
import * as fs from 'fs';
import * as yargs from 'yargs';
import * as chalk from 'chalk';

import { StdData } from '../std-data';


class WeightedQuickUnionUF {
  private parent: number[];
  private size: number[];
  private _count: number;

  constructor(n: number) {
    this._count = n;
    this.parent = new Array(n);
    this.size = new Array(n);

    for (let i = 0; i < n; i ++) {
      this.parent[i] = i;
      this.size[i] = 1;
    }
  }

  count(): number {
    return this._count;
  }

  root(p: number): number {
    while (p !== this.parent[p]) {
      p = this.parent[p];
    }
    return p;
  }

  connected(p: number, q: number): boolean {
    return this.root(p) === this.root(q);
  }

  union(p: number, q: number): void {
    const pId = this.root(p);
    const qId = this.root(q);

    if (pId === qId) {
      return;
    }

    if (this.size[pId] > this.size[qId]) {
      this.parent[qId] = pId;
      this.size[pId] += this.size[qId];
    } else {
      this.parent[pId] = qId;
      this.size[qId] += this.size[pId];
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
    .alias('q', 'quiet')
    .default('q', false)
    .epilog(
      'weighted-quick-union data type (also known as disjoint-sets data type) example'
    )
    .argv;

  const content = fs.readFileSync(argv.file, {encoding: 'utf8'});
  const stdData = new StdData(content);

  const n = +stdData.get(); // size of the quick-union array
  const wqu = new WeightedQuickUnionUF(n);

  console.log(`size of the disjoint-sets data type is ${n}`);

  while (!stdData.empty()) {
    const p = +stdData.get();
    const q = +stdData.get();
    if (wqu.connected(p, q)) {
      if (!argv.quiet) {
        console.log('.');
      }
      continue;
    }
    wqu.union(p, q);
    if (!argv.quiet) {
      console.log(p + '--' + q);
    }
  }
  console.log(wqu.count() + ' components');
};

// Main loop
if (require.main === module) {
  main();
}
