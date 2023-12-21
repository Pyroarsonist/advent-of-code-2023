import fs from "fs";

import { parser } from "./parser";
import { mirror } from "./mirror";

const inputFilePath = `${__dirname}/input.txt`;

const getSum = (schema) => {
  const matrices = parser(schema);

  let sum = 0;
  for (const matrix of matrices) {
    const { verticalCount, horizontalCount } = mirror(matrix);
    sum += verticalCount + horizontalCount * 100;
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
