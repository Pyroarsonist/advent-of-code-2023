import fs from "fs";

import readline from "readline";

const inputFilePath = `${__dirname}/input.txt`;

const processLine = (line) => {
  const sets = line.split(";");

  const matches = [];

  for (const set of sets) {
    const _matches = [
      ...set.matchAll(/(?<count>\d+) (?<color>blue|red|green)/g),
    ].map((res) => {
      const {
        groups: { color, count },
      } = res;

      return {
        count: +count,
        color,
      };
    });

    matches.push(..._matches);
  }

  const getMaxByColor = (color) =>
    matches
      .filter((m) => m.color === color)
      .reduce((max, match) => Math.max(max, match.count), 0);

  const redMax = getMaxByColor("red");
  const blueMax = getMaxByColor("blue");
  const greenMax = getMaxByColor("green");
  const power = redMax * blueMax * greenMax;

  return power;
};

const main = async () => {
  const fileStream = fs.createReadStream(inputFilePath);

  let sum = 0;

  await new Promise((res) => {
    const rl = readline.createInterface({
      input: fileStream,
    });

    rl.on("line", (line) => {
      const lineNum = processLine(line);
      sum += lineNum;
    });

    rl.on("close", res);
  });

  console.info(`Sum: ${sum}`);
};

main();
