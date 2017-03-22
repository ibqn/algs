import * as readline from 'readline';
import * as fs from 'fs';
import * as yargs from 'yargs';
import * as chalk from 'chalk';
import * as math from 'mathjs';

import { StdData } from '../std-data';
import { Bag } from '../bag';


// Main code
const main = function() {
  const argv = yargs
    .usage('Usage: [options]')
    .example('$0 -f data.txt', 'Loads data from file')
    .alias('f', 'file')
    .nargs('f', 1)
    .default('f', 'data.txt')
    .describe('f', 'Specify file with data')
    .demandOption(['f'])
    .help('h')
    .alias('h', 'help')
    .default('q', false)
    .epilog(
      'bag - reads data from file and adds it to the bag'
    )
    .argv;

  let content: string;
  try {
    content = fs.readFileSync(argv.file, {encoding: 'utf8'});
  } catch (e) {
    console.error(`Could not open file '${argv.file}'`);
    console.log('Falling back to predefined data set');
    content = 'to be or not to - be - - that - - - is';
  }
  let stdData = new StdData(content);

  const bag = new Bag<string>();
  while (!stdData.empty()) {
    bag.add(stdData.get());
  }
  console.log(`size of bag = ${bag.size()}`);
  // show content of the bag
  console.log(`${bag}`);
};

// Main loop
if (require.main === module) {
  main();
}
