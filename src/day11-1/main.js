import fs from "fs";

import { parser } from "./parser";
import { getShortestPaths } from "./getShortestPaths";

const inputFilePath = `${__dirname}/input.txt`;

const getShortestPathSum = (schema) => {
  const matrix = parser(schema);

  const shortestPaths = getShortestPaths(matrix);

  return shortestPaths.reduce((sum, path) => sum + path.distance, 0);
};

const main = async () => {
  const buf = fs.readFileSync(inputFilePath);

  const dateBefore = Date.now();

  const shortestPathSum = getShortestPathSum(buf.toString());

  console.info(`Shortest path sum: ${shortestPathSum}`);
  const dateAfter = Date.now();
  console.info(`Time: ${dateAfter - dateBefore} ms`);
};

main();
