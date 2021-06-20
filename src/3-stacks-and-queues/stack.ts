import fs from 'fs'
import yargs from 'yargs'

import { StdData } from '../std-data'
import { Stack } from '../stack'

// Main code
const main = function () {
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
    .epilog(
      'stack - reads data from file and pushes or pops them on/from stack'
    ).argv as Args

  let content: string
  try {
    content = fs.readFileSync(argv.file, { encoding: 'utf8' })
  } catch (e) {
    console.error(`Could not open file '${argv.file}'`)
    console.log('Falling back to predefined data set')
    content = 'to be or not to - be - - that - - - is'
  }
  let stdData = new StdData(content)

  const stack = new Stack<string>()
  while (!stdData.empty()) {
    const item = stdData.get()
    if (item !== '-') {
      stack.push(item)
    } else if (!stack.isEmpty()) {
      process.stdout.write(`${stack.pop()} `)
    }
  }
  console.log(`(${stack.size()} left on stack)`)
}

// Main loop
if (require.main === module) {
  main()
}
