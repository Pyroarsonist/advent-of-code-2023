import fs from "fs";

import { parser } from "./parser";
import { getIntersections } from "./getIntersections";

const inputFilePath = `${__dirname}/input.txt`;

const getAnswer = (schema) => {
  const hails = parser(schema);

  return getIntersections(hails);
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
