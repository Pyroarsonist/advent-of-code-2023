const Directions = {
  right: "right",
  top: "top",
  bottom: "bottom",
  left: "left",
};

const velocity = (direction) => {
  let dx = 0;
  let dy = 0;
  if (direction === Directions.right) {
    dy += 1;
  } else if (direction === Directions.top) {
    dx -= 1;
  } else if (direction === Directions.bottom) {
    dx += 1;
  } else {
    dy -= 1;
  }

  return { dx, dy };
};

const isEnd = (beam, matrix) =>
  beam.x === -1 ||
  beam.y === -1 ||
  beam.x === matrix.length ||
  beam.y === matrix[0].length;

// /
const processSlash = (beam) => {
  if (beam.direction === Directions.right) {
    beam.direction = Directions.top;
  } else if (beam.direction === Directions.left) {
    beam.direction = Directions.bottom;
  } else if (beam.direction === Directions.bottom) {
    beam.direction = Directions.left;
  } else {
    beam.direction = Directions.right;
  }
};

// \
const processBackslash = (beam) => {
  if (beam.direction === Directions.right) {
    beam.direction = Directions.bottom;
  } else if (beam.direction === Directions.left) {
    beam.direction = Directions.top;
  } else if (beam.direction === Directions.bottom) {
    beam.direction = Directions.right;
  } else {
    beam.direction = Directions.left;
  }
};

// -
const processHorizontal = (beam, beams) => {
  if (
    beam.direction === Directions.right ||
    beam.direction === Directions.left
  ) {
    return;
  }

  beams.shift();

  beams.push(
    {
      ...beam,
      direction: Directions.left,
    },
    {
      ...beam,
      direction: Directions.right,
    },
  );
};

// |
const processVertical = (beam, beams) => {
  if (
    beam.direction === Directions.top ||
    beam.direction === Directions.bottom
  ) {
    return;
  }

  beams.shift();

  beams.push(
    {
      ...beam,
      direction: Directions.top,
    },
    {
      ...beam,
      direction: Directions.bottom,
    },
  );
};

const existsInCache = (beam, cacheMatrix) => {
  const arr = cacheMatrix[beam.x][beam.y];

  return arr.some((direction) => direction === beam.direction);
};

export const getEnergizedCount = (matrix) => {
  const cacheMatrix = JSON.parse(JSON.stringify(matrix)).map((row) =>
    row.map(() => []),
  );

  const beams = [
    {
      direction: Directions.right,
      x: 0,
      y: -1,
    },
  ];

  while (beams.length) {
    const beam = beams[0];
    const { dx, dy } = velocity(beam.direction);
    beam.x += dx;
    beam.y += dy;

    if (isEnd(beam, matrix)) {
      beams.shift();
      continue;
    }

    const cell = matrix[beam.x][beam.y];

    if (existsInCache(beam, cacheMatrix)) {
      beams.shift();
      continue;
    } else {
      cacheMatrix[beam.x][beam.y].push(beam.direction);
    }

    if (cell === ".") {
      continue;
    } else if (cell === "/") {
      processSlash(beam);
    } else if (cell === "\\") {
      processBackslash(beam);
    } else if (cell === "-") {
      processHorizontal(beam, beams);
    } else if (cell === "|") {
      processVertical(beam, beams);
    }
  }

  const energized = cacheMatrix
    .flat()
    .reduce((sum, item) => sum + +(item.length > 0), 0);

  return energized;
};
