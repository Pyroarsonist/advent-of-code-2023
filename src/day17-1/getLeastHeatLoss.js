const MAX_STEPS = 3;

const Directions = {
  right: "right",
  top: "top",
  bottom: "bottom",
  left: "left",
};

const move = (direction) => {
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

const getKey = (point) =>
  `${point.x}:${point.y}:${point.direction}:${point.step}`;

const f = (point) => point.heat;

const pathComparator = (a, b) => f(a) - f(b);
const getNextPoints = (point, matrix, closedPointsMap) => {
  if (point.step === MAX_STEPS + 1) return [];
  const shouldTurn = point.step === MAX_STEPS;

  const possibleDirections = [];

  if (
    point.y !== matrix[0].length - 1 &&
    point.direction !== Directions.left &&
    (shouldTurn ? point.direction !== Directions.right : true)
  ) {
    possibleDirections.push(Directions.right);
  }

  if (
    point.y !== 0 &&
    point.direction !== Directions.right &&
    (shouldTurn ? point.direction !== Directions.left : true)
  ) {
    possibleDirections.push(Directions.left);
  }

  if (
    point.x !== matrix.length - 1 &&
    point.direction !== Directions.top &&
    (shouldTurn ? point.direction !== Directions.bottom : true)
  ) {
    possibleDirections.push(Directions.bottom);
  }

  if (
    point.x !== 0 &&
    point.direction !== Directions.bottom &&
    (shouldTurn ? point.direction !== Directions.top : true)
  ) {
    possibleDirections.push(Directions.top);
  }

  const nextPoints = [];

  for (const direction of possibleDirections) {
    const newPoint = { ...point };
    const { dx, dy } = move(direction);
    newPoint.x += dx;
    newPoint.y += dy;

    if (newPoint.direction !== direction) {
      newPoint.step = 0;
    }

    newPoint.direction = direction;

    newPoint.step++;

    const pointHeat = matrix[newPoint.x][newPoint.y];
    newPoint.heat += pointHeat;

    const key = getKey(newPoint);

    if (closedPointsMap.has(key)) {
      const val = closedPointsMap.get(key);

      const min = Math.min(val, newPoint.heat);

      if (min < val) {
        closedPointsMap.set(key, min);
      } else {
        continue;
      }
    } else {
      closedPointsMap.set(key, newPoint.heat);
    }

    nextPoints.push(newPoint);
  }

  return nextPoints;
};

export const getLeastHeatLoss = (matrix) => {
  const openPoints = [
    {
      direction: null,
      x: 0,
      y: 0,
      heat: 0,
      step: 0,
    },
  ];

  const closedPointsMap = new Map();

  while (openPoints.length) {
    openPoints.sort((a, b) => pathComparator(a, b));

    const point = openPoints[0];

    const nextPoints = getNextPoints(point, matrix, closedPointsMap);

    openPoints.push(
      ...nextPoints.filter((p) => {
        const k = getKey(p);

        return openPoints.every((openPoint) => {
          const openK = getKey(openPoint);
          return openK !== k;
        });
      }),
    );

    openPoints.shift();
  }

  const endPointFromTop = {
    x: matrix.length - 1,
    y: matrix[0].length - 1,
    direction: Directions.bottom,
  };
  const endPointFromLeft = {
    x: matrix.length - 1,
    y: matrix[0].length - 1,
    direction: Directions.right,
  };

  let min = Infinity;

  for (let i = 0; i < MAX_STEPS + 1; i++) {
    const c1 =
      closedPointsMap.get(getKey({ ...endPointFromTop, step: i })) ?? Infinity;
    const c2 =
      closedPointsMap.get(getKey({ ...endPointFromLeft, step: i })) ?? Infinity;
    min = Math.min(c1, c2, min);
  }

  return min;
};
