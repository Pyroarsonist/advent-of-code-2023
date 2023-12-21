import fs from "fs";

import { parser } from "./parser";
import { getLoad } from "./getLoad";

const inputFilePath = `${__dirname}/input.txt`;

const getTotalLoad = (schema) => {
  const matrix = parser(schema);

  return getLoad(matrix);
};

const main = async () => {
  const buf = fs.readFileSync(inputFilePath);

  const dateBefore = Date.now();

  const totalLoad = getTotalLoad(buf.toString());

  console.info(`Total load: ${totalLoad}`);
  const dateAfter = Date.now();
  console.info(`Time: ${dateAfter - dateBefore} ms`);
};

main();
