import * as fs from 'fs';
import * as yargs from 'yargs';

import { StdData } from '../std-data';


class QuickUnionUF {
  private parent: number[];
  private _count: number;

  constructor(n: number) {
    this._count = n;
    this.parent = new Array(n);

    for (let i = 0; i < n; i ++) {
      this.parent[i] = i;
    }
  }

  count(): number {
    return this._count;
  }

  find(p: number): number {
    while (p !== this.parent[p]) {
      p = this.parent[p];
    }
    return p;
  }

  connected(p: number, q: number): boolean {
    return this.find(p) === this.find(q);
  }

  union(p: number, q: number): void {
    const pId = this.find(p);
    const qId = this.find(q);

    if (pId === qId) {
      return;
    }

    this.parent[pId] = qId;

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
      'quick-union data type (also known as disjoint-sets data type) example'
    )
    .argv;

  const content = fs.readFileSync(argv.file, {encoding: 'utf8'});
  const stdData = new StdData(content);

  const n = +stdData.get(); // size of the union-find array
  const qu = new QuickUnionUF(n);

  console.log(`size of the disjoint-sets data type is ${n}`);

  while (!stdData.empty()) {
    const p = +stdData.get();
    const q = +stdData.get();
    if (qu.connected(p, q)) {
      if (!argv.quiet) { console.log('.'); }
      continue;
    }
    qu.union(p, q);
    if (!argv.quiet) {
      console.log(`${p} -- ${q}`);
    }
  }
  console.log(`${qu.count()} components`);
};

// Main loop
if (require.main === module) {
  main();
}
