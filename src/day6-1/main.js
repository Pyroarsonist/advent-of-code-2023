import fs from "fs";

import { parser } from "./parser";
import { iterateRaces } from "./iterateRaces";

const inputFilePath = `${__dirname}/input.txt`;

const p = (arr) => arr.reduce((acc, item) => acc * item, 1);

const getWaysProduct = (schema) => {
  const races = parser(schema);

  const products = iterateRaces(races);

  return p(products);
};

const main = async () => {
  const buf = fs.readFileSync(inputFilePath);

  const product = getWaysProduct(buf.toString());

  console.info(`Ways product: ${product}`);
};

main();
