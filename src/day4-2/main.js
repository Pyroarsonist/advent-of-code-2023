import fs from "fs";

import readline from "readline";

const inputFilePath = `${__dirname}/input.txt`;

const getWins = (cardNumber, line) => {
  const cards = line
    .split("|")
    .map((x) => x.split(" ").filter(Boolean).map(Number));

  let wins = 0;

  const [winningNumbers, yourNumbers] = cards;

  for (const winningNumber of winningNumbers) {
    for (const yourNumber of yourNumbers) {
      if (winningNumber === yourNumber) {
        wins++;
      }
    }
  }

  return wins;
};

const calculateTotalCards = (winsMap) => {
  const { length } = Object.keys(winsMap);

  const map = Object.fromEntries(Object.keys(winsMap).map((k) => [k, 1]));
  for (const cardNumber of Object.keys(map)) {
    const count = map[cardNumber];
    const wins = winsMap[cardNumber];
    if (wins === 0) continue;
    for (let i = 1; i < 1 + wins; i++) {
      const index = +cardNumber + i;
      if (index > length) break;
      map[index] += count;
    }
  }

  return Object.values(map).reduce((sum, val) => sum + val, 0);
};

const main = async () => {
  const fileStream = fs.createReadStream(inputFilePath);

  const winsMap = {};

  let cardNumber = 1;

  await new Promise((res) => {
    const rl = readline.createInterface({
      input: fileStream,
    });

    rl.on("line", (line) => {
      const wins = getWins(cardNumber, line.split(":")[1]);
      winsMap[cardNumber] = wins;
      cardNumber++;
    });

    rl.on("close", res);
  });

  const sum = calculateTotalCards(winsMap);
  console.info(`Sum: ${sum}`);
};

main();
