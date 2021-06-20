import fs from 'fs'
import yargs from 'yargs'

import { StdData } from '../std-data'

class UF {
  private parent: number[]
  private rank: number[]
  private cnt: number

  constructor(n: number) {
    this.cnt = n
    this.parent = new Array(n)
    this.rank = new Array(n)

    for (let i = 0; i < n; i++) {
      this.parent[i] = i
      this.rank[i] = 0
    }
  }

  count(): number {
    return this.cnt
  }

  root(p: number): number {
    while (p !== this.parent[p]) {
      this.parent[p] = this.parent[this.parent[p]] // path compression by halving
      p = this.parent[p]
    }
    return p
  }

  connected(p: number, q: number): boolean {
    return this.root(p) === this.root(q)
  }

  union(p: number, q: number): void {
    const pId = this.root(p)
    const qId = this.root(q)

    if (pId === qId) {
      return
    }

    if (this.rank[pId] > this.rank[qId]) {
      this.parent[qId] = pId
    } else if (this.rank[pId] < this.rank[qId]) {
      this.parent[pId] = qId
    } else {
      this.parent[pId] = qId
      this.rank[qId]++
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
      'union-find data type (also known as disjoint-sets data type) example'
    ).argv as Args

  const content = fs.readFileSync(argv.file, { encoding: 'utf8' })
  const stdData = new StdData(content)

  const n = +stdData.get() // size of the quick-union array
  const wqu = new UF(n)

  console.log(`size of the disjoint-sets data type is ${n}`)

  while (!stdData.empty()) {
    const p = +stdData.get()
    const q = +stdData.get()
    if (wqu.connected(p, q)) {
      if (!argv.quiet) {
        console.log('.')
      }
      continue
    }
    wqu.union(p, q)
    if (!argv.quiet) {
      console.log(`${p} -- ${q}`)
    }
  }
  console.log(`${wqu.count()} components`)
}

// Main loop
if (require.main === module) {
  main()
}
