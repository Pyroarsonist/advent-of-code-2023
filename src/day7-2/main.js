import fs from "fs";

import { parser } from "./parser";
import { sortHands } from "./sortHands";

const inputFilePath = `${__dirname}/input.txt`;

const getTotalWinnings = (schema) => {
  const hands = parser(schema);

  const sortedHands = sortHands(hands);

  return [...sortedHands]
    .reverse()
    .reduce((acc, hand, i) => acc + hand.bid * (i + 1), 0);
};

const main = async () => {
  const buf = fs.readFileSync(inputFilePath);

  const winnings = getTotalWinnings(buf.toString());

  console.info(`Total winnings: ${winnings}`);
};

main();
