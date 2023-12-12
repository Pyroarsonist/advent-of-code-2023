import fs from "fs";

import { parser } from "./parser";
import { lookup } from "./lookup";

const inputFilePath = `${__dirname}/input.txt`;

const getSteps = (schema) => {
  const input = parser(schema);

  return lookup(input);
};

const main = async () => {
  const buf = fs.readFileSync(inputFilePath);

  const steps = getSteps(buf.toString());

  console.info(`Steps: ${steps}`);
};

main();
