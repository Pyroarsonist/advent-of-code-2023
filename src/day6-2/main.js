import fs from "fs";

import { parser } from "./parser";
import { getWaysOfRace } from "./getWaysOfRace";

const inputFilePath = `${__dirname}/input.txt`;

const getWays = (schema) => {
  const race = parser(schema);

  return getWaysOfRace(race);
};

const main = async () => {
  const buf = fs.readFileSync(inputFilePath);

  const ways = getWays(buf.toString());

  console.info(`Ways: ${ways}`);
};

main();
