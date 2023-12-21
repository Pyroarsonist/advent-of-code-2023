import { EMPTY_CELL, ROUND_CELL } from "./constants";

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

const shift = (_matrix) => {
  const matrix = JSON.parse(JSON.stringify(_matrix));

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
