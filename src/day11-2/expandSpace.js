import { GALAXY_CELL } from "./constants";

const SPACE_MODIFIER = 1000000 - 1;

const getVoidSet = (_set) => {
  const set = new Set();

  let shift = 0;
  for (const s of _set) {
    set.add(s + shift * SPACE_MODIFIER);
    shift++;
  }

  return set;
};

export const expandSpace = (matrix) => {
  const galaxies = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      const cell = matrix[i][j];
      if (cell === GALAXY_CELL) {
        galaxies.push({ x: i, y: j, id: galaxies.length + 1 });
      }
    }
  }

  const voidSet = {
    x: new Set([...Array(matrix.length)].map((_, i) => i)),
    y: new Set([...Array(matrix[0].length)].map((_, i) => i)),
  };

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      const cell = matrix[i][j];
      if (cell === GALAXY_CELL) {
        voidSet.x.delete(i);
        voidSet.y.delete(j);
      }
    }
  }

  const shiftedVoidSet = {
    x: getVoidSet(voidSet.x),
    y: getVoidSet(voidSet.y),
  };

  for (const g of galaxies) {
    for (const x of shiftedVoidSet.x) {
      if (x <= g.x) {
        g.x += SPACE_MODIFIER;
      }
    }

    for (const y of shiftedVoidSet.y) {
      if (y <= g.y) {
        g.y += SPACE_MODIFIER;
      }
    }
  }

  return galaxies;
};
