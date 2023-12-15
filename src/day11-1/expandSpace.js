import { GALAXY_CELL, VOID_CELL } from "./constants";

export const expandSpace = (_matrix) => {
  const voidMap = {
    x: new Set([...Array(_matrix.length)].map((_, i) => i)),
    y: new Set([...Array(_matrix[0].length)].map((_, i) => i)),
  };

  const galaxies = [];

  for (let i = 0; i < _matrix.length; i++) {
    for (let j = 0; j < _matrix[0].length; j++) {
      const cell = _matrix[i][j];
      if (cell === GALAXY_CELL) {
        voidMap.x.delete(i);
        voidMap.y.delete(j);
      }
    }
  }

  const matrix = JSON.parse(JSON.stringify(_matrix));

  let shift = 0;
  for (const x of voidMap.x) {
    const insertedRow = [...Array(_matrix.length)].map(() => VOID_CELL);
    matrix.splice(x + shift, 0, insertedRow);
    shift++;
  }

  shift = 0;

  for (const y of voidMap.y) {
    for (const row of matrix) {
      row.splice(y + shift, 0, VOID_CELL);
    }

    shift++;
  }

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      const cell = matrix[i][j];
      if (cell === GALAXY_CELL) {
        galaxies.push({ x: i, y: j, id: galaxies.length + 1 });
      }
    }
  }

  return { matrix, galaxies };
};
