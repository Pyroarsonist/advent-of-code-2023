import fs from "fs";

import readline from "readline";

const inputFilePath = `${__dirname}/input.txt`;

const RED_MAX = 12;
const GREEN_MAX = 13;
const BLUE_MAX = 14;

const checkGame = (line) => {
  const sets = line.split(";");

  try {
    for (const set of sets) {
      const matches = [
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

      for (const match of matches) {
        if (match.color === "red" && match.count > RED_MAX) {
          throw new Error("red");
        }

        if (match.color === "green" && match.count > GREEN_MAX) {
          throw new Error("green");
        }

        if (match.color === "blue" && match.count > BLUE_MAX) {
          throw new Error("blue");
        }
      }
    }
  } catch (e) {
    return false;
  }

  return true;
};

const processLine = (line) => {
  const id = +/Game (?<id>\d+)/.exec(line).groups.id;
  const isPossible = checkGame(line);

  return isPossible ? id : null;
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
      if (lineNum) {
        sum += lineNum;
      }
    });

    rl.on("close", res);
  });

  console.info(`Sum: ${sum}`);
};

main();
