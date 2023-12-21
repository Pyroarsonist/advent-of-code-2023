import fs from "fs";

import { parser } from "./parser";
import { focalPower } from "./focalPower";

const inputFilePath = `${__dirname}/input.txt`;

const getAnswer = (schema) => {
  const strings = parser(schema);

  return focalPower(strings);
};

const main = async () => {
  const buf = fs.readFileSync(inputFilePath);

  const dateBefore = Date.now();

  const answer = getAnswer(buf.toString());

  console.info(`Answer: ${answer}`);
  const dateAfter = Date.now();
  console.info(`Time: ${dateAfter - dateBefore} ms`);
};

main();
