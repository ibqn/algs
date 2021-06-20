import * as math from 'mathjs'

export class StdRandom {
  // @return a random real number uniformly in [0, 1)
  public static uniform(): number {
    return math.random()
  }

  public static uniformInt(one: number, two?: number): number {
    if (two) {
      return math.randomInt(one, two)
    }
    return math.randomInt(one)
  }

  public static shuffle<T>(a: T[]): T[] {
    const n = a.length
    for (let i = 0; i < n; i++) {
      const r = StdRandom.uniformInt(i, n) // between i and n-1
      const temp: T = a[i]
      a[i] = a[r]
      a[r] = temp
    }
    return a
  }

  private constructor() {}
}
