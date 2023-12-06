import fs from "fs";

const inputFilePath = `${__dirname}/input.txt`;

const findSymbols = (matrix) => {
  const symbols = [];

  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i];
    for (let j = 0; j < row.length; j++) {
      const c = row[j];
      if (c === "*") {
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

const getGearRatios = (_symbols, numbers) => {
  const symbols = _symbols.map((s) => ({ ...s, numbers: [] }));

  for (const { number, startIndex, endIndex, rowIndex } of numbers) {
    for (const s of symbols) {
      const rowIndexMatch =
        rowIndex - 1 <= s.rowIndex && s.rowIndex <= rowIndex + 1;

      const colIndexMatch =
        startIndex - 1 <= s.colIndex && s.colIndex <= endIndex + 1;

      const ok = rowIndexMatch && colIndexMatch;

      if (ok) {
        s.numbers.push(number);
      }
    }
  }

  const gears = symbols.filter((s) => s.numbers.length === 2);

  return gears.map((g) => g.numbers[0] * g.numbers[1]);
};

const getSum = (schema) => {
  const lines = schema.split("\n");
  const matrix = lines.map((line) => line.split(""));

  const symbols = findSymbols(matrix);
  const numbers = findNumbers(lines);

  const gearRatios = getGearRatios(symbols, numbers);

  return gearRatios.reduce((sum, num) => sum + num, 0);
};

const main = async () => {
  const buf = fs.readFileSync(inputFilePath);

  const sum = getSum(buf.toString());

  console.info(`Sum: ${sum}`);
};

main();
