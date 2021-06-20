import fs from 'fs'
import yargs from 'yargs'

import { StdData } from '../std-data'
import { BinarySearch } from '../binary-search'

class ThreeSumFast {
  constructor() {}

  private containsDuplicates(a: number[]): boolean {
    for (let i = 1; i < a.length; i++) {
      if (a[i] === a[i - 1]) {
        return true
      }
    }
    return false
  }

  count(a: number[]): number {
    // sort an array numerically
    a = a.sort((i, j) => i - j)
    const n = a.length

    if (this.containsDuplicates(a)) {
      console.log('dups are present')
      process.exit(1)
    }

    let count = 0
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        let k = BinarySearch.indexOf(a, -(a[i] + a[j]))
        if (k > j) {
          count++
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
    .epilog('three-sum-fast counts the number of triples which sum to zero')
    .argv as Args

  const content = fs.readFileSync(argv.file, { encoding: 'utf8' })
  const stdData = new StdData(content)

  const data: number[] = stdData.get_all().map((d) => +d)
  const n = data.length
  console.log(`size of the data set is ${n}`)

  const tsf = new ThreeSumFast()
  const count = tsf.count(data)

  console.log(`${count} triples sums to zero`)
}

// Main loop
if (require.main === module) {
  main()
}
