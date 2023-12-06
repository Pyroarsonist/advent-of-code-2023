import fs from "fs";

import readline from "readline";

const inputFilePath = `${__dirname}/input.txt`;

const processLine = (line) => {
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

  if (wins === 0) return 0;

  const power = wins - 1;

  return 2 ** power;
};

const main = async () => {
  const fileStream = fs.createReadStream(inputFilePath);

  let sum = 0;

  await new Promise((res) => {
    const rl = readline.createInterface({
      input: fileStream,
    });

    rl.on("line", (line) => {
      const lineNum = processLine(line.split(":")[1]);
      sum += lineNum;
    });

    rl.on("close", res);
  });

  console.info(`Sum: ${sum}`);
};

main();
