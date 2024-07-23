import { Cells, Directions } from "./constants";
import { isInside } from "./isInside";

const move = ({ direction, meters }) => {
  let dx = 0;
  let dy = 0;
  if (direction === Directions.right) {
    dy += meters;
  } else if (direction === Directions.top) {
    dx -= meters;
  } else if (direction === Directions.bottom) {
    dx += meters;
  } else {
    dy -= meters;
  }

  return { dx, dy };
};
const createMatrix = (digPlans) => {
  let minX = Infinity;
  let maxX = -Infinity;

  let minY = Infinity;
  let maxY = -Infinity;

  let x = 0;
  let y = 0;

  for (const plan of digPlans) {
    const { dx, dy } = move(plan);
    x += dx;
    y += dy;

    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);

    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }

  const xLength = maxX - minX + 1;
  const yLength = maxY - minY + 1;

  const matrix = Array.from({ length: xLength }).map(() =>
    Array.from({ length: yLength }).fill(Cells.GROUND),
  );

  x = -minX;
  y = -minY;

  matrix[x][y] = Cells.TRENCH;

  for (const plan of digPlans) {
    for (let i = 0; i < plan.meters; i++) {
      const { dx, dy } = move({ direction: plan.direction, meters: 1 });
      x += dx;
      y += dy;
      matrix[x][y] = Cells.TRENCH;
    }
  }
  return matrix;
};

const createBounds = (digPlans) => {
  let minX = Infinity;
  let maxX = -Infinity;

  let minY = Infinity;
  let maxY = -Infinity;

  let x = 0;
  let y = 0;

  for (const plan of digPlans) {
    const { dx, dy } = move(plan);
    x += dx;
    y += dy;

    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);

    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }

  const bounds = [];

  x = -minX;
  y = -minY;
  for (const plan of digPlans) {
    const { dx, dy } = move(plan);
    x += dx;
    y += dy;

    bounds.push({ x, y });
  }

  return bounds;
};

const fillMatrix = (_matrix, bounds) => {
  const matrix = JSON.parse(JSON.stringify(_matrix));

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      const cell = matrix[i][j];
      if (cell === Cells.TRENCH) continue;

      const inside = isInside(bounds, i, j);
      if (inside) {
        matrix[i][j] = Cells.NEW_TRENCH;
      }
    }
  }

  return matrix;
};

const getVolume = (matrix) => {
  let sum = 0;
  for (const row of matrix) {
    for (const cell of row) {
      if (cell === Cells.TRENCH || cell === Cells.NEW_TRENCH) {
        sum++;
      }
    }
  }
  return sum;
};

export const getLavaVolume = (digPlans) => {
  const matrix = createMatrix(digPlans);
  const bounds = createBounds(digPlans);
  const filledMatrix = fillMatrix(matrix, bounds);

  return getVolume(filledMatrix);
};
