import fs from "fs";

import { parser } from "./parser";
import { getDistancesMatrix } from "./getDistancesMatrix";

const inputFilePath = `${__dirname}/input.txt`;

const getFarthestDistance = (schema) => {
  const matrix = parser(schema);

  const distances = getDistancesMatrix(matrix);

  return Math.max(...distances.flatMap((d) => d));
};

const main = async () => {
  const buf = fs.readFileSync(inputFilePath);

  const farthest = getFarthestDistance(buf.toString());

  console.info(`Farthest point: ${farthest}`);
};

main();
