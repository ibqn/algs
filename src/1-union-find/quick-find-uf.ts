import fs from 'fs'
import yargs from 'yargs'

import { StdData } from '../std-data'

class QuickFindUF {
  private id: number[]
  private cnt: number

  constructor(n: number) {
    this.cnt = n
    this.id = new Array(n)

    for (let i = 0; i < n; i++) {
      this.id[i] = i
    }
  }

  count(): number {
    return this.cnt
  }

  find(p: number): number {
    return this.id[p]
  }

  connected(p: number, q: number): boolean {
    return this.id[p] === this.id[q]
  }

  union(p: number, q: number): void {
    const pId = this.id[p]
    const qId = this.id[q]

    if (pId === qId) {
      return
    }

    for (let i = 0; i < this.id.length; i++) {
      if (this.id[i] === pId) {
        this.id[i] = qId
      }
    }
    this.cnt--
  }
}

// Main code
type Args = {
  file: string
  quiet: boolean
}
const main = function () {
  const argv = yargs
    .usage('Usage: [options]')
    .example('$0 -f tinyUF.txt', 'Loads pairs of integers from file')
    .alias('file', 'f')
    .nargs('file', 1)
    .default('file', 'tinyUF.txt')
    .describe('file', 'Specify file with pairs of integers')
    .demandOption(['file'])
    .help('h')
    .alias('h', 'help')
    .alias('quiet', 'q')
    .default('quiet', false)
    .epilog(
      'union–find data type (also known as disjoint-sets data type) example'
    ).argv as Args

  const content = fs.readFileSync(argv.file, { encoding: 'utf8' })
  const stdData = new StdData(content)

  const n = +stdData.get() // size of the union-find array
  const uf = new QuickFindUF(n)

  console.log(`size of the disjoint-sets data type is ${n}`)

  while (!stdData.empty()) {
    const p = +stdData.get()
    const q = +stdData.get()
    if (uf.connected(p, q)) {
      if (!argv.quiet) {
        console.log('.')
      }
      continue
    }
    uf.union(p, q)
    if (!argv.quiet) {
      console.log(`${p} -- ${q}`)
    }
  }
  console.log(`${uf.count()} components`)
}

// Main loop
if (require.main === module) {
  main()
}
