import fs from 'fs'
import yargs from 'yargs'

import { StdData } from '../std-data'

class ThreeSum {
  constructor() {}

  count(a: number[]): number {
    const n = a.length
    let count = 0
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        for (let k = j + 1; k < n; k++) {
          if (a[i] + a[j] + a[k] === 0) {
            count++
          }
        }
      }
    }
    return count
  }
}

// Main code
type Args = {
  file: string
}

const main = () => {
  const argv = yargs
    .usage('Usage: [options]')
    .example('$0 -f 1Kints.txt', 'Loads integers from file')
    .alias('file', 'f')
    .nargs('file', 1)
    .default('file', '1Kints.txt')
    .describe('file', 'Specify file with integers')
    .demandOption(['file'])
    .help('h')
    .alias('h', 'help')
    .epilog('three-sum counts the number of triples which sum to zero')
    .argv as Args

  const content = fs.readFileSync(argv.file, { encoding: 'utf8' })
  const stdData = new StdData(content)

  const data: number[] = stdData.get_all().map((d) => +d)
  const n = data.length
  console.log(`size of the data set is ${n}`)

  const ts = new ThreeSum()
  const count = ts.count(data)

  console.log(`${count} triples sums to zero`)
}

// Main loop
if (require.main === module) {
  main()
}
