import fs from "fs";

import { parser } from "./parser";
import { parseOasis } from "./parseOasis";

const inputFilePath = `${__dirname}/input.txt`;

const getSum = (schema) => {
  const input = parser(schema);

  const extrapolatedValues = parseOasis(input);

  return extrapolatedValues.reduce((sum, num) => sum + num, 0);
};

const main = async () => {
  const buf = fs.readFileSync(inputFilePath);

  const sum = getSum(buf.toString());

  console.info(`Sum: ${sum}`);
};

main();
