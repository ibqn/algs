import * as fs from 'fs';
import * as yargs from 'yargs';

import { StdData } from '../std-data';
import { Stack } from '../stack';


const LEFT_PAREN     = '(';
const RIGHT_PAREN    = ')';

const LEFT_BRACE     = '{';
const RIGHT_BRACE    = '}';

const LEFT_BRACKET   = '[';
const RIGHT_BRACKET  = ']';

const BRA = [LEFT_PAREN, LEFT_BRACE, LEFT_BRACKET];
const KET = [RIGHT_PAREN, RIGHT_BRACE, RIGHT_BRACKET];

const isBalanced = (s: string): boolean => {
  const stack = new Stack<string>();

  let i;
  for (let c of s) {
    if (BRA.indexOf(c) !== -1) {
      stack.push(c);
    } else if ((i = KET.indexOf(c)) !== -1) {
      if (stack.isEmpty() || (stack.pop() !== BRA[i])) {
        return false;
      }
    }
  }
  return stack.isEmpty();
};

// Main code
const main = function() {
  const argv = yargs
    .usage('Usage: [options]')
    .example('$0 -f data.txt', 'Loads data from file')
    .alias('f', 'file')
    .nargs('f', 1)
    .describe('f', 'Specify file with data')
    .help('h')
    .alias('h', 'help')
    .epilog(
      'parantesis - reads data from a file ' +
      'and checks to see if the parentheses are balanced.'
    )
    .argv;

  let content = ['[()]{}{[()()]()}', '[(])'];
  if (argv.file) {
    try {
      const input = fs.readFileSync(argv.file, {encoding: 'utf8'});
      const stdData = new StdData(input);
      content = stdData.get_all();
    } catch (e) {
      console.error(`Could not open file '${argv.file}'`);
    }
}

  for (let d of content) {
    console.log(`${d} is${isBalanced(d) ? '' : ' not'} balanced`);
  }
};

// Main loop
if (require.main === module) {
  main();
}
