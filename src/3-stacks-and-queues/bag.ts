import fs from 'fs'
import yargs from 'yargs'

import { StdData } from '../std-data'
import { Bag } from '../bag'

// Main code
const main = () => {
  type Args = {
    file: string
  }

  const argv = yargs
    .usage('Usage: [options]')
    .example('$0 -f tobe.txt', 'Loads data from file')
    .alias('file', 'f')
    .string('file')
    .nargs('file', 1)
    .default('file', 'tobe.txt')
    .describe('file', 'Specify file with data')
    .demandOption(['file'])
    .help('h')
    .alias('h', 'help')
    .epilog('bag - reads data from file and adds it to the bag').argv as Args

  let content: string
  try {
    content = fs.readFileSync(argv.file, { encoding: 'utf8' })
  } catch (e) {
    console.error(`Could not open file '${argv.file}'`)
    console.log('Falling back to predefined data set')
    content = 'to be or not to - be - - that - - - is'
  }
  let stdData = new StdData(content)

  const bag = new Bag<string>()
  while (!stdData.empty()) {
    bag.add(stdData.get())
  }
  console.log(`size of bag = ${bag.size()}`)
  // show content of the bag
  console.log(`${bag}`)
}

// Main loop
if (require.main === module) {
  main()
}
