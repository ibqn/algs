import * as fs from 'fs';
import * as yargs from 'yargs';

import { Comparable } from '../comparable';

import { Selection }  from '../selection-sort';
import { Merge }      from '../merge-sort';
import { Shell }      from '../shell-sort';
import { Insertion }  from '../insertion-sort';

import { show } from '../sorting-methods';

import { StdData } from '../std-data';


// Main code
export function main(name?: string) {
  const argv = yargs
    .usage('Usage: [options]')
    .example('$0 -f data.txt', 'Loads data from file')
    .alias('f', 'file')
    .nargs('f', 1)
    .describe('f', 'Specify file with data')
    .help('h')
    .alias('h', 'help')
    .alias('n', 'numeric')
    .describe('n', 'Switch between lexicalal and numerical sorting')
    .default('n', false)
    .epilog(
      'selection - reads data from a file ' +
      'and sorts it using selection algorithm'
    )
    .argv;

  const sorting_methods = {
    'merge': Merge.sort,
    'insertion': Insertion.sort,
    'shell': Shell.sort,
    'selection': Selection.sort,
  };

  // create a function pointer for the desired sorting method!
  let sort: <T>(c: Comparable<T>[]) => Comparable<T>[] = Insertion.sort;

  if (name in sorting_methods) {
    console.log(`Sorting method: '${name}'`);
    sort = sorting_methods[name];
  }

  // default fallback input
  let input = 'S O R T E X A M P L E';
  if (argv.file) {
    try {
      input = fs.readFileSync(argv.file, {encoding: 'utf8'});
    } catch (e) {
      console.warn(`Could not open file '${argv.file}'`);
    }
  } else {
    console.log(`Using predefined data '${input}' for sorting!`);
  }
  const stdData = new StdData(input);
  let content: number[] | string[] = stdData.get_all();
  if (argv.numeric) {
    content = content.map(d => +d) as number[];
  }

  sort(content);
  show(content);
};


// Main loop
if (require.main === module) {
  main();
}
