import fs from "fs";

import { parseMaps } from "./parseMaps";
import { getLocations } from "./getLocations";

const inputFilePath = `${__dirname}/input.txt`;

const min = (arr) =>
  arr.reduce(
    (minimum, item) => Math.min(minimum, item),
    Number.MAX_SAFE_INTEGER,
  );

const getLowestLocation = (schema) => {
  const maps = parseMaps(schema);

  const locations = getLocations(maps);

  return min(locations.map((l) => l.startNumber));
};

const main = async () => {
  const buf = fs.readFileSync(inputFilePath);

  const lowestLocation = getLowestLocation(buf.toString());

  console.info(`Lowest location: ${lowestLocation}`);
};

main();
