import fs from "fs";

import { parser } from "./parser";
import { getClosedTilesNumber } from "./getClosedTilesNumber";

const inputFilePath = `${__dirname}/input.txt`;

const getFarthestDistance = (schema) => {
  const matrix = parser(schema);

  return getClosedTilesNumber(matrix);
};

const main = async () => {
  const buf = fs.readFileSync(inputFilePath);

  const dateBefore = Date.now();

  const closedTilesNum = getFarthestDistance(buf.toString());

  console.info(`Closed tiles num: ${closedTilesNum}`);
  const dateAfter = Date.now();
  console.info(`Time: ${dateAfter - dateBefore} ms`);
};

main();
