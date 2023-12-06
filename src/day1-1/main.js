import fs from "fs";

import readline from "readline";

const inputFilePath = `${__dirname}/input.txt`;

const processLine = (line) => {
  const predicate = (c) => "0123456789".includes(c);

  const chars = line.split("");

  const first = chars.find(predicate);
  const last = chars.findLast(predicate);

  return +(first + last);
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
