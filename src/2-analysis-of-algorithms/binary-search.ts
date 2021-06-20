import fs from 'fs'
import yargs from 'yargs'

import { StdData } from '../std-data'
import { BinarySearch } from '../binary-search'

// Main code
type Args = {
  file: string
  whiteList: string
}
const main = () => {
  const argv = yargs
    .usage('Usage: [options]')
    .example('$0 -f tinyW.txt -w tinyT.txt', 'Loads integers from file')
    .alias('file', 'f')
    .string('file')
    .nargs('file', 1)
    .default('file', 'tinyW.txt')
    .describe('file', 'Specify file with integers')
    .demandOption(['f'])
    .help('h')
    .alias('h', 'help')
    .alias('whiteList', 'w')
    .string('whiteList')
    .nargs('whiteList', 1)
    .default('whiteList', 'tinyT.txt')
    .describe('witeList', 'Specify whitelist file with integers')
    .epilog(
      'binary-searching prints values which are not in the whitelist file'
    ).argv as Args

  let content = fs.readFileSync(argv.whiteList, { encoding: 'utf8' })
  let stdData = new StdData(content)

  const whitelist = stdData
    .get_all()
    .map((d) => +d)
    .sort((i, j) => i - j)
  console.log(`size of the whitelist data set is ${whitelist.length}`)

  content = fs.readFileSync(argv.file, { encoding: 'utf8' })
  stdData = new StdData(content)

  while (!stdData.empty()) {
    const key = +stdData.get()
    if (BinarySearch.indexOf(whitelist, key) === -1) {
      console.log(key)
    }
  }
}

// Main loop
if (require.main === module) {
  main()
}
