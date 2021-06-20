import fs from "fs";
import yargs from "yargs";

import { Comparable } from "../comparable";

import { Selection } from "../selection-sort";
import { Merge } from "../merge-sort";
import { MergeBU } from "../merge-bu-sort";
import { Shell } from "../shell-sort";
import { Insertion } from "../insertion-sort";
import { Quick } from "../quick-sort";

import { show } from "../sorting-methods";

import { StdData } from "../std-data";

// Main code
export function main(name?: string) {
  type Args = {
    file: string;
    numeric: boolean;
  };

  const argv = yargs
    .usage("Usage: [options]")
    .example("$0 -f data.txt", "Loads data from file")
    .alias("file", "f")
    .string("file")
    .nargs("file", 1)
    .describe("file", "Specify file with data")
    .help("help")
    .alias("help", "h")
    .alias("numeric", "n")
    .describe("numeric", "Switch between lexical and numerical sorting")
    .default("numeric", false)
    .epilog(
      `${name} - reads data from a file and sorts it using selected algorithm`
    ).argv as Args;

  const sorting_methods = {
    merge: Merge.sort,
    "merge-bu": MergeBU.sort,
    insertion: Insertion.sort,
    shell: Shell.sort,
    selection: Selection.sort,
    quick: Quick.sort,
  };

  // create a function pointer for the desired sorting method!
  let sort: <T>(c: Comparable<T>[]) => Comparable<T>[] = Insertion.sort;

  if (name in sorting_methods) {
    console.log(`Sorting method: '${name}'`);
    sort = sorting_methods[name];
  }

  // default fallback input
  let input = "S O R T E X A M P L E";
  if (argv.file) {
    try {
      input = fs.readFileSync(argv.file, { encoding: "utf8" });
    } catch (e) {
      console.warn(`Could not open file '${argv.file}'`);
    }
  } else {
    console.log(`Using predefined data '${input}' for sorting!`);
  }
  const stdData = new StdData(input);
  let content: number[] | string[] = stdData.get_all();
  if (argv.numeric) {
    content = content.map((d) => +d) as number[];
  }

  sort(content);
  show(content);
}

// Main loop
if (require.main === module) {
  main();
}
