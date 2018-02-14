import * as fs from 'fs';
import * as yargs from 'yargs';

import { StdData } from '../std-data';
import { Queue } from '../queue';


// Main code
const main = function() {
  const argv = yargs
    .usage('Usage: [options]')
    .example('$0 -f tobe.txt', 'Loads data from file')
    .alias('f', 'file')
    .nargs('f', 1)
    .default('f', 'tobe.txt')
    .describe('f', 'Specify file with data')
    .demandOption(['f'])
    .help('h')
    .alias('h', 'help')
    .epilog(
      'queue - reads data from file and pushes or pops them on/from queue'
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

  const queue = new Queue<string>();
  while (!stdData.empty()) {
    const item = stdData.get();
    if (item !== '-') {
      queue.enqueue(item);
    } else if (!queue.isEmpty()) {
      process.stdout.write(`${queue.dequeue()} `);
    }
  }
  console.log(`(${queue.size()} left on queue)`);
};

// Main loop
if (require.main === module) {
  main();
}
