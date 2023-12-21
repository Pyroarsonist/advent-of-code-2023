import { EMPTY_CELL, ROUND_CELL } from "./constants";
import { parser } from "./parser";

const rotateMatrixClockwise = (matrix) => {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const rotatedMatrix = Array.from({ length: cols }, () => Array(rows).fill(0));

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      rotatedMatrix[j][rows - i - 1] = matrix[i][j];
    }
  }

  return rotatedMatrix;
};

const shiftPosition = (matrix, i, j) => {
  let shiftX = i;

  for (let x = i - 1; x > -1; x--) {
    const cell = matrix[x][j];
    if (cell === EMPTY_CELL) {
      shiftX = x;
    } else {
      break;
    }
  }

  return { x: shiftX, y: j };
};

const cycle = (_matrix) => {
  let matrix = JSON.parse(JSON.stringify(_matrix));

  for (let side = 0; side < 4; side++) {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {
        const cell = matrix[i][j];

        if (cell !== ROUND_CELL) {
          continue;
        }

        const { x, y } = shiftPosition(matrix, i, j);

        const isEqual = x === i && y === j;

        if (!isEqual) {
          matrix[x][y] = ROUND_CELL;
          matrix[i][j] = EMPTY_CELL;
        }
      }
    }

    matrix = rotateMatrixClockwise(matrix);
  }

  return matrix;
};

const getHash = (matrix) => {
  const str = matrix.map((x) => x.join("")).join("\n");

  return Buffer.from(str).toString("base64");
};

const getMatrixFromHash = (hash) =>
  parser(Buffer.from(hash, "base64").toString("utf8"));

const shift = (_matrix) => {
  let matrix = JSON.parse(JSON.stringify(_matrix));

  const cache = {};

  let startOfCycle;

  const CYCLES_COUNT = 1000000000;
  for (let i = 0; i < CYCLES_COUNT; i++) {
    const hash = getHash(matrix);
    const v = cache[hash];
    if (v) {
      startOfCycle = v;
      break;
    } else {
      cache[hash] = i;
    }

    matrix = cycle(matrix);
  }

  const newCache = Object.fromEntries(
    Object.entries(cache)
      .filter(([, v]) => v >= startOfCycle)
      .map(([k, v]) => [k, v - startOfCycle]),
  );

  const r = (CYCLES_COUNT - startOfCycle) % Object.values(newCache).length;

  const [foundHash] = Object.entries(newCache).find(([, v]) => v === r);

  matrix = getMatrixFromHash(foundHash);

  return matrix;
};

const calcLoad = (matrix) => {
  let sum = 0;

  for (let i = 0; i < matrix.length; i++) {
    const val = matrix.length - i;

    for (let j = 0; j < matrix[0].length; j++) {
      const cell = matrix[i][j];

      if (cell === ROUND_CELL) {
        sum += val;
      }
    }
  }

  return sum;
};

export const getLoad = (matrix) => {
  const shiftedMatrix = shift(matrix);

  const load = calcLoad(shiftedMatrix);

  return load;
};
