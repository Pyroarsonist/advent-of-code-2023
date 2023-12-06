import fs from "fs";

const inputFilePath = `${__dirname}/input.txt`;

const findSymbols = (matrix) => {
  const symbols = [];

  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i];
    for (let j = 0; j < row.length; j++) {
      const c = row[j];
      if (!"0123456789.".includes(c)) {
        symbols.push({
          rowIndex: i,
          colIndex: j,
        });
      }
    }
  }

  return symbols;
};

const findNumbers = (lines) => {
  const numbers = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const r = /(?<number>\d+)/g;

    const matches = [...line.matchAll(r)];

    if (!matches.length) {
      continue;
    }

    const items = matches.map((m) => ({
      number: +m.groups.number,
      startIndex: m.index,
      endIndex: m.index + m.groups.number.length - 1,
      rowIndex: i,
    }));

    numbers.push(...items);
  }

  return numbers;
};

const getPartNumbers = (symbols, numbers) => {
  const partNumbers = [];

  for (const { number, startIndex, endIndex, rowIndex } of numbers) {
    const ok = symbols.some((s) => {
      const rowIndexMatch =
        rowIndex - 1 <= s.rowIndex && s.rowIndex <= rowIndex + 1;

      const colIndexMatch =
        startIndex - 1 <= s.colIndex && s.colIndex <= endIndex + 1;

      return rowIndexMatch && colIndexMatch;
    });

    if (ok) {
      partNumbers.push(number);
    }
  }

  return partNumbers;
};

const getSum = (schema) => {
  const lines = schema.split("\n");
  const matrix = lines.map((line) => line.split(""));

  const symbols = findSymbols(matrix);
  const numbers = findNumbers(lines);

  const partNumbers = getPartNumbers(symbols, numbers);

  return partNumbers.reduce((sum, num) => sum + num, 0);
};

const main = async () => {
  const buf = fs.readFileSync(inputFilePath);

  const sum = getSum(buf.toString());

  console.info(`Sum: ${sum}`);
};

main();
