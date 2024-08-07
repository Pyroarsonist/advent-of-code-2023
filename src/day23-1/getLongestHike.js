import { FOREST, PATH, Slopes, START_TILE } from "./constants";

export const getLongestHike = (matrix) => {
  const initialVisited = JSON.parse(JSON.stringify(matrix)).map((line) =>
    line.map(() => false),
  );

  const END_TILE = { x: matrix.length - 1, y: matrix[0].length - 2 };

  const hikes = [];

  const variants = [
    { step: 0, x: START_TILE.x, y: START_TILE.y, visited: initialVisited },
  ];

  while (variants.length) {
    const variant = variants.shift();

    const visited = JSON.parse(JSON.stringify(variant.visited));
    const cell = matrix?.[variant.x]?.[variant.y];

    if (variant.x === END_TILE.x && variant.y === END_TILE.y) {
      hikes.push(variant.step);
      continue;
    }

    visited[variant.x][variant.y] = true;

    const topCoords = [variant.x - 1, variant.y];
    const rightCoords = [variant.x, variant.y + 1];
    const bottomCoords = [variant.x + 1, variant.y];
    const leftCoords = [variant.x, variant.y - 1];

    const cellToPositionsMap = {
      [Slopes.UP]: [topCoords],
      [Slopes.DOWN]: [bottomCoords],
      [Slopes.LEFT]: [leftCoords],
      [Slopes.RIGHT]: [rightCoords],
      [PATH]: [topCoords, rightCoords, bottomCoords, leftCoords],
    };

    const nextPositions = cellToPositionsMap[cell];

    for (const [x, y] of nextPositions) {
      const nextCell = matrix?.[x]?.[y];
      if (!nextCell || nextCell === FOREST || visited?.[x]?.[y]) {
        continue;
      }
      variants.push({ step: variant.step + 1, x, y, visited });
    }
  }

  return Math.max(...hikes);
};
