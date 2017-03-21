import * as readline from 'readline';
import * as fs from 'fs';
import * as yargs from 'yargs';
import * as chalk from 'chalk';

import { StdData } from '../std-data';
import { BinarySearch } from '../binary-search';


// Main code
const main = function() {
  const argv = yargs
    .usage('Usage: [options]')
    .example('$0 -f tinyW.txt -w tinyT.txt', 'Loads integers from file')
    .alias('f', 'file')
    .nargs('f', 1)
    .default('f', 'tinyW.txt')
    .describe('f', 'Specify file with integers')
    .demandOption(['f'])
    .help('h')
    .alias('h', 'help')
    .alias('w', 'whitelist')
    .nargs('w', 1)
    .default('w', 'tinyT.txt')
    .describe('w', 'Specify whitelist file with integers')
    .default('q', false)
    .epilog(
      'binary-searching prints values which are not in the whitelist file'
    )
    .argv;

  let content = fs.readFileSync(argv.whitelist, {encoding: 'utf8'});
  let stdData = new StdData(content);

  const whitelist = stdData.get_all().map(d => +d).sort((i, j) => i - j);
  console.log(`size of the whitelist data set is ${whitelist.length}`);

  content = fs.readFileSync(argv.file, {encoding: 'utf8'});
  stdData = new StdData(content);

  while (!stdData.empty()) {
    const key = +stdData.get();
    if (BinarySearch.indexOf(whitelist, key) === -1) {
      console.log(key);
    }
  }
};

// Main loop
if (require.main === module) {
  main();
}
