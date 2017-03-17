import * as readline from 'readline';
import * as fs from 'fs';
import * as yargs from 'yargs';
import * as chalk from 'chalk';
import * as math from 'mathjs';

import { StdData } from '../std-data';


class ThreeSumFast {
  constructor() {}

  private containsDuplicates(a: number[]): boolean {
    for (let i = 1; i < a.length; i ++) {
      if (a[i] === a[i - 1]) {
        return true;
      }
    }
    return false;
  }

  private binarySearch(a: number[], val: number): number {
    let lo: number = 0;
    let hi: number = a.length - 1;
    let mid: number;
    while (lo <= hi) {
      mid = math.floor((hi + lo) / 2);
      if (val < a[mid]) {
        hi = mid - 1;
      } else if (val > a[mid]) {
        lo = mid + 1;
      } else {
        return mid;
      }
    }
    return -1;
  }

  count(a: number[]): number {
    // sort an array numerically
    a = a.sort((i, j) => i - j);
    const n = a.length;

    if(this.containsDuplicates(a)) {
      console.log('dups are present');
      process.exit(1);
    }

    let count = 0;
    for (let i = 0; i < n; i ++) {
      for (let j = i + 1; j < n; j ++) {
        let k = this.binarySearch(a, -(a[i] + a[j]));
        if (k > j) {
          count ++;
        }
      }
    }
    return count;
  }
}

// Main code
const main = function() {
  const argv = yargs
    .usage('Usage: [options]')
    .example('$0 -f 1Kints.txt', 'Loads integers from file')
    .alias('f', 'file')
    .nargs('f', 1)
    .default('f', '1Kints.txt')
    .describe('f', 'Specify file with integers')
    .demandOption(['f'])
    .help('h')
    .alias('h', 'help')
    .alias('q', 'quiet')
    .default('q', false)
    .epilog(
      'three-sum-fast counts the number of triples which sum to zero'
    )
    .argv;

  const content = fs.readFileSync(argv.file, {encoding: 'utf8'});
  const stdData = new StdData(content);

  const data: number[] = stdData.get_all().map(d => +d);
  const n = data.length;
  console.log(`size of the data set is ${n}`);

  const tsf = new ThreeSumFast();
  const count = tsf.count(data);

  console.log(`${count} triples sums to zero`);
};

// Main loop
if (require.main === module) {
  main();
}
