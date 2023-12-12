const GROUND_CELL = ".";
const START_CELL = "S";

const getStartPoint = (matrix) => {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      const cell = matrix[i][j];
      if (cell === START_CELL) {
        return {
          x: i,
          y: j,
        };
      }
    }
  }

  return null;
};

const ValidatePipesMap = {
  "-": {
    from: {
      x: [0],
      y: [-1, 1],
    },
    to: {
      x: [0],
      y: [-1, 1],
    },
  },
  "|": {
    from: {
      y: [0],
      x: [-1, 1],
    },
    to: {
      y: [0],
      x: [-1, 1],
    },
  },
  L: {
    from: {
      x: [-1, 0],
      y: [0, 1],
    },
    to: {
      x: [1, 0],
      y: [0, -1],
    },
  },
  J: {
    from: {
      x: [-1, 0],
      y: [-1, 0],
    },
    to: {
      x: [1, 0],
      y: [0, 1],
    },
  },
  7: {
    from: {
      x: [1, 0],
      y: [-1, 0],
    },
    to: {
      x: [-1, 0],
      y: [0, 1],
    },
  },
  F: {
    from: {
      x: [1, 0],
      y: [1, 0],
    },
    to: {
      x: [-1, 0],
      y: [-1, 0],
    },
  },
};

const validatePipe = (where, cell, dx, dy) => {
  if (cell === START_CELL) return true;

  const val = ValidatePipesMap[cell][where];

  return val.x.includes(dx) && val.y.includes(dy);
};

const isEdgeValidated = (from, to) => {
  if (to.cell === GROUND_CELL || to.fired) return false;
  const dx = to.x - from.x;
  const dy = to.y - from.y;

  const fromIsValidated = validatePipe("from", from.cell, dx, dy);
  const toIsValidated = validatePipe("to", to.cell, dx, dy);

  return fromIsValidated && toIsValidated;
};

const getAdjacentTiles = (x, y, matrix) => {
  const { cell } = matrix[x][y];
  let tiles = [];

  const startX = x === 0 ? x : x - 1;
  const startY = y === 0 ? y : y - 1;

  const endX = x === matrix.length - 1 ? x : x + 1;
  const endY = y === matrix.length - 1 ? y : y + 1;

  for (let i = startX; i <= endX; i++) {
    for (let j = startY; j <= endY; j++) {
      const sameCell = x === i && y === j;

      const diagonalCell = Math.abs(x - i) === 1 && Math.abs(y - j);

      if (!sameCell && !diagonalCell) {
        tiles.push({ x: i, y: j });
      }
    }
  }

  tiles = tiles.filter((tile) =>
    isEdgeValidated(
      { x, y, cell },
      {
        ...tile,
        cell: matrix[tile.x][tile.y].cell,
        fired: matrix[tile.x][tile.y].fired,
      },
    ),
  );

  return tiles;
};

const getDetailedMatrix = (matrix, x, y) => {
  const newMatrix = matrix.map((row) =>
    row.map((cell) => ({
      cell,
      distance: -1,
      fired: false,
    })),
  );

  newMatrix[x][y].distance = 0;

  return newMatrix;
};

const executeFire = (matrix, x, y) => {
  matrix[x][y].fired = true;

  const tiles = getAdjacentTiles(x, y, matrix);
  for (const tile of tiles) {
    matrix[tile.x][tile.y].distance = matrix[x][y].distance + 1;
  }

  return tiles;
};
const fire = (matrix, x, y) => {
  const tilesToFire = [{ x, y }];
  for (let i = 0; i < tilesToFire.length; i++) {
    // console.log(tilesToFire.length);
    const tile = tilesToFire[i];
    const tiles = executeFire(matrix, tile.x, tile.y);
    // console.log({ tiles });
    // process.exit(1);

    tilesToFire.push(...tiles);
  }
};

export const getDistancesMatrix = (matrix) => {
  const { x, y } = getStartPoint(matrix);

  const detailedMatrix = getDetailedMatrix(matrix, x, y);

  fire(detailedMatrix, x, y);

  return detailedMatrix.flatMap((r) => r.map((l) => l.distance));
};
