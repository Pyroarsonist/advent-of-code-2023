import { GARDEN, START, STEPS_COUNT } from "./constants";

const countStarts = (matrix) => {
  let count = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const cell = matrix[i][j];
      if (cell === START) {
        count++;
      }
    }
  }
  return count;
};

const processMatrix = (matrix) => {
  const oldStarts = [];
  const toGo = new Map();

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const cell = matrix[i][j];
      if (cell === START) {
        oldStarts.push({ i, j });
        const topCoords = [i, j + 1];
        const rightCoords = [i + 1, j];
        const bottomCoords = [i, j - 1];
        const leftCoords = [i - 1, j];

        [topCoords, rightCoords, bottomCoords, leftCoords].forEach(
          ([newI, newJ]) => {
            const c = matrix?.[newI]?.[newJ];
            if (c === START || c === GARDEN) {
              toGo.set({ i: newI, j: newJ }, true);
            }
          },
        );
      }
    }
  }

  for (const { i, j } of oldStarts) {
    matrix[i][j] = GARDEN;
  }

  for (const { i, j } of toGo.keys()) {
    matrix[i][j] = START;
  }
};

export const getGardenSpots = (initialMatrix) => {
  const matrix = JSON.parse(JSON.stringify(initialMatrix));

  for (let i = 0; i < STEPS_COUNT; i++) {
    processMatrix(matrix);
  }

  return countStarts(matrix);
};
