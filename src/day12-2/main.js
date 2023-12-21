import fs from "fs";

import { parser } from "./parser";
import { arrange } from "./arrange";

const inputFilePath = `${__dirname}/input.txt`;

const getSum = (schema) => {
  const rows = parser(schema);

  let sum = 0;
  for (const row of rows) {
    const arrangesCount = arrange(row);
    sum += arrangesCount;
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
