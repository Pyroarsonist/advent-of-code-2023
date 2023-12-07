import fs from "fs";

import { parseMaps } from "./parseMaps";
import { getLocations } from "./getLocations";

const inputFilePath = `${__dirname}/input.txt`;

const getLowestLocation = (schema) => {
  const maps = parseMaps(schema);

  const locations = getLocations(maps);

  return Math.min(...locations);
};

const main = async () => {
  const buf = fs.readFileSync(inputFilePath);

  const lowestLocation = getLowestLocation(buf.toString());

  console.info(`Lowest location: ${lowestLocation}`);
};

main();
