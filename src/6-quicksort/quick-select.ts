import * as fs from 'fs'
import yargs from 'yargs'

import { StdData } from '../std-data'
import { StdRandom } from '../std-random'

import { Comparable } from '../comparable'
import { partition } from '../sorting-methods'

class QuickSelect {
  public static select<T>(v: Comparable<T>[], k: number): Comparable<T> {
    StdRandom.shuffle<Comparable<T>>(v)
    let lo = 0
    let hi = v.length - 1
    while (hi > lo) {
      const p = partition<T>(v, lo, hi)
      if (p < k) {
        lo = p + 1
      } else if (p > k) {
        hi = p - 1
      } else {
        return v[k]
      }
    }
    return v[k]
  }

  private constructor() {}
}

// Main code
const main = function () {
  type Args = {
    file: string
    numeric: boolean
    select: number
  }

  const argv = yargs
    .usage('Usage: [options]')
    .example('$0 -f data.txt', 'Loads data from file')
    .alias('file', 'f')
    .string('file')
    .nargs('file', 1)
    .describe('file', 'Specify file with data')
    .help('help')
    .alias('help', 'h')
    .alias('select', 's')
    .default('select', 0)
    .nargs('select', 1)
    .alias('numeric', 'n')
    .describe('numeric', 'Switch between lexical and numerical sorting')
    .default('numeric', false)
    .epilog('quick select example').argv as Args

  // default fallback input
  let input = 'S O R T E X A M P L E'
  if (argv.file) {
    try {
      input = fs.readFileSync(argv.file, { encoding: 'utf8' })
    } catch (e) {
      console.warn(`Could not open file '${argv.file}'`)
    }
  }
  const stdData = new StdData(input)
  let content: number[] | string[] = stdData.get_all()
  if (argv.numeric) {
    content = content.map((d) => +d) as number[]
  }

  const nth = QuickSelect.select(content, argv.select)
  console.log(`${nth}`)
}

// Main loop
if (require.main === module) {
  main()
}
