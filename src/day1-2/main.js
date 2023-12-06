import fs from "fs";

import readline from "readline";

const inputFilePath = `${__dirname}/input.txt`;

const formatLine = (line, reverse = false) => {
  const arr = line.split("");

  if (reverse) arr.reverse();

  const map = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };

  const replaceStr = (_str) => {
    let str = _str;

    for (const [key, val] of Object.entries(map)) {
      if (reverse) {
        str = str.replaceAll(key.split("").reverse().join(""), val);
      } else {
        str = str.replaceAll(key, val);
      }
    }

    return str;
  };

  const res = arr.reduce((str, c) => replaceStr(str + c), "");

  if (reverse) return res.split("").reverse().join("");

  return res.split("").join("");
};

const predicate = (c) => "0123456789".includes(c);

const processLine = (line) => {
  const first = formatLine(line).split("").find(predicate);
  const last = formatLine(line, true).split("").findLast(predicate);

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
