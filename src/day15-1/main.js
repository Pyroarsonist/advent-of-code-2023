import fs from "fs";

import { parser } from "./parser";
import { hash } from "./hash";

const inputFilePath = `${__dirname}/input.txt`;

const getSum = (schema) => {
  let sum = 0;
  const strings = parser(schema);

  for (const string of strings) {
    sum += hash(string);
  }

  return sum;
};

const main = async () => {
  const buf = fs.readFileSync(inputFilePath);

  const dateBefore = Date.now();

  const sum = getSum(buf.toString());

  console.info(`Sum: ${sum}`);
  const dateAfter = Date.now();
  console.info(`Time: ${dateAfter - dateBefore} ms`);
};

main();
