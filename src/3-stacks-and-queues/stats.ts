import fs from 'fs'
import yargs from 'yargs'
import math from 'mathjs'

import { StdData } from '../std-data'
import { Bag } from '../bag'

// Main code
const main = function () {
  type Args = {
    file: string
  }

  const argv = yargs
    .usage('Usage: [options]')
    .example('$0 -f data.txt', 'Loads integers from file')
    .alias('file', 'f')
    .string('file')
    .nargs('file', 1)
    .default('file', 'data.txt')
    .describe('file', 'Specify file with integers')
    .demandOption(['file'])
    .help('h')
    .alias('h', 'help')
    .epilog(
      'stats reads numbers from file and prints ' +
        'their mean and standard deviation'
    ).argv as Args

  let content: string
  try {
    content = fs.readFileSync(argv.file, { encoding: 'utf8' })
  } catch (e) {
    console.error(`Could not open file '${argv.file}'`)
    console.log('Falling back to predefined data set')
    content = '100 99 101 120 98 107 109 81 101 90'
  }
  let stdData = new StdData(content)

  const numbers = new Bag<number>()
  while (!stdData.empty()) {
    numbers.add(+stdData.get())
  }
  console.log(`${numbers}`)

  const n = numbers.size()

  // compute sample mean
  let sum = 0.0
  for (let x of numbers) {
    sum += x
  }
  const mean = sum / n

  // compute sample standard deviation
  sum = 0.0
  for (let x of numbers) {
    sum += (x - mean) * (x - mean)
  }
  let stddev = math.sqrt(sum / (n - 1))

  console.log(`Mean:    ${mean.toFixed(2)}`)
  console.log(`Std dev: ${stddev.toFixed(2)}`)
}

// Main loop
if (require.main === module) {
  main()
}
