import * as readline from 'readline';
import * as fs from 'fs';
import * as yargs from 'yargs';
import * as chalk from 'chalk';

import { StdData } from '../std-data';


class ThreeSum {
  constructor() {

  }

  count(a: number[]): number {
    return 1;
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
      'three-sum counts the number of triples which sum to zero'
    )
    .argv;

  const content = fs.readFileSync(argv.file, {encoding: 'utf8'});
  const stdData = new StdData(content);

  const n = +stdData.get(); // size of the quick-union array
  const ts = new ThreeSum();

  console.log(`size of the disjoint-sets data type is ${n}`);
};

// Main loop
if (require.main === module) {
  main();
}
