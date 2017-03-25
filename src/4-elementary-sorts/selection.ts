import { Comparable } from '../comparable';
import { Selection } from '../selection';

import '../comparable-string';


import * as fs from 'fs';
import * as yargs from 'yargs';

import { StdData } from '../std-data';


// Main code
const main = function() {
  const argv = yargs
    .usage('Usage: [options]')
    .example('$0 -f data.txt', 'Loads data from file')
    .alias('f', 'file')
    .nargs('f', 1)
    .describe('f', 'Specify file with data')
    .help('h')
    .alias('h', 'help')
    .epilog(
      'selection - reads data from a file ' +
      'and sorts it using selection algorithm'
    )
    .argv;

  let input = 'S O R T E X A M P L E';
  if (argv.file) {
    try {
      input = fs.readFileSync(argv.file, {encoding: 'utf8'});
    } catch (e) {
      console.warn(`Could not open file '${argv.file}'`);
    }
  }
  const stdData = new StdData(input);
  let content: Comparable[] = stdData.get_all();

  Selection.sort(content);

  for (let d of content) {
    console.log(d);
  }
};

// Main loop
if (require.main === module) {
  main();
}
