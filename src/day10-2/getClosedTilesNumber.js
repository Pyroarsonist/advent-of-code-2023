const GROUND_CELL = ".";
const START_CELL = "S";
const START_COLOR = 1;

const getStartPoint = (matrix) => {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      const { cell } = matrix[i][j];
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

const getFirstNotColoredTile = (matrix) => {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (!matrix[i][j].color) {
        return { x: i, y: j };
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
  if (to.cell === GROUND_CELL || to.color) return false;
  const dx = to.x - from.x;
  const dy = to.y - from.y;

  const fromIsValidated = validatePipe("from", from.cell, dx, dy);
  const toIsValidated = validatePipe("to", to.cell, dx, dy);

  return fromIsValidated && toIsValidated;
};

const getAdjacentTiles = (x, y, matrix, startPointLoop) => {
  const { cell } = matrix[x][y];
  let tiles = [];

  const startX = x === 0 ? x : x - 1;
  const startY = y === 0 ? y : y - 1;

  const endX = x === matrix.length - 1 ? x : x + 1;
  const endY = y === matrix[0].length - 1 ? y : y + 1;

  for (let i = startX; i <= endX; i++) {
    for (let j = startY; j <= endY; j++) {
      const sameCell = x === i && y === j;

      const diagonalCell = Math.abs(x - i) === 1 && Math.abs(y - j);

      if (!sameCell && !diagonalCell) {
        tiles.push({ x: i, y: j });
      }
    }
  }

  if (startPointLoop) {
    tiles = tiles.filter((tile) =>
      isEdgeValidated(
        { x, y, cell },
        {
          ...tile,
          cell: matrix[tile.x][tile.y].cell,
          color: matrix[tile.x][tile.y].color,
        },
      ),
    );
  } else {
    tiles = tiles.filter(
      (tile) =>
        !matrix[tile.x][tile.y].color &&
        (cell === GROUND_CELL) ===
          (matrix[tile.x][tile.y].cell === GROUND_CELL),
    );
  }

  return tiles;
};

const getDetailedMatrix = (matrix) =>
  matrix.map((row) =>
    row.map((cell) => ({
      cell,
      color: null,
    })),
  );

const executeColor = (matrix, x, y, color) => {
  matrix[x][y].color = color;

  return getAdjacentTiles(x, y, matrix, color === START_COLOR);
};

const color = (matrix, x, y, colorNum) => {
  const tilesToColor = [{ x, y }];

  let tile = tilesToColor.shift();

  while (tile) {
    if (!matrix[tile.x][tile.y].color) {
      const tiles = executeColor(matrix, tile.x, tile.y, colorNum);
      tilesToColor.push(...tiles);
    }

    tile = tilesToColor.shift();
  }
};

const colorAll = (matrix) => {
  const { x, y } = getStartPoint(matrix);

  color(matrix, x, y, START_COLOR);

  let colorNum = START_COLOR;

  let point = getFirstNotColoredTile(matrix);

  while (point) {
    colorNum++;

    color(matrix, point.x, point.y, colorNum);

    point = getFirstNotColoredTile(matrix);
  }

  return colorNum;
};

const getNumberOfColoredTiles = (matrix, colorNum) => {
  let sum = 0;

  for (const row of matrix) {
    for (const tile of row) {
      if (tile.color === colorNum) {
        sum++;
      }
    }
  }

  return sum;
};

const getFirstPointByColor = (matrix, colorNum) => {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j].color === colorNum) {
        return { x: i, y: j };
      }
    }
  }

  return null;
};

const getStartLetter = (matrix) => {
  const { x, y } = getStartPoint(matrix);

  const hasTop = x !== 0 && "|7F".includes(matrix[x - 1][y].cell);

  const hasRight =
    y !== matrix[0].length - 1 && "-7J".includes(matrix[x][y + 1].cell);

  const hasBottom =
    x !== matrix.length - 1 && "|LJ".includes(matrix[x + 1][y].cell);

  const hasLeft = y !== 0 && "-FL".includes(matrix[x][y - 1].cell);

  let letter;

  if (hasTop && hasBottom) {
    letter = "|";
  }
  if (hasLeft && hasRight) {
    letter = "-";
  }
  if (hasTop && hasRight) {
    letter = "L";
  }
  if (hasTop && hasLeft) {
    letter = "J";
  }
  if (hasBottom && hasRight) {
    letter = "F";
  }
  if (hasBottom && hasLeft) {
    letter = "7";
  }

  return letter;
};

const countSpecificCharacter = (str, char) => str.split(char).length - 1;

const countLetters = (str) => {
  const chars = "|LJ".split("");

  let sum = 0;
  for (const char of chars) {
    sum += countSpecificCharacter(str, char);
  }

  return sum;
};

function createColorMapForInsideTiles(matrix, maxColorNum) {
  const map = {};

  for (let colorNum = START_COLOR + 1; colorNum <= maxColorNum; colorNum++) {
    const { x, y } = getFirstPointByColor(matrix, colorNum);

    const row = matrix[x];

    const left = [];

    for (let j = 0; j < y; j++) {
      const item = row[j];
      left.push(item);
    }

    const startLetter = getStartLetter(matrix);

    const obstaclesLeft = countLetters(
      left
        .filter(
          (item) => item.color === START_COLOR && !".-".includes(item.cell),
        )
        .map((item) => item.cell)
        .join("")
        .replace(START_CELL, startLetter),
    );

    const isInside = obstaclesLeft % 2 === 1;

    map[colorNum] = isInside;
  }

  return map;
}

export const getClosedTilesNumber = (matrix) => {
  const detailedMatrix = getDetailedMatrix(matrix);

  const maxColorNum = colorAll(detailedMatrix);

  const colorMap = createColorMapForInsideTiles(detailedMatrix, maxColorNum);

  const closedTilesNumber = Object.entries(colorMap)
    .filter(([, ok]) => ok)
    .map(([colorNum]) => getNumberOfColoredTiles(detailedMatrix, +colorNum))
    .reduce((sum, num) => sum + num, 0);

  return closedTilesNumber;
};
