import { GARDEN, ROCK, START, STEPS_COUNT } from "./constants";

const getVisitedMap = (_matrix) => {
  const matrix = JSON.parse(JSON.stringify(_matrix));

  const visitedMap = new Map();
  let toProcess = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const cell = matrix[i][j];
      if (cell === START) {
        toProcess.push({ i, j });
      } else if (cell === ROCK) {
        const key = `${i}:${j}`;
        visitedMap.set(key, -1);
      }
    }
  }
  let step = 0;

  while (!(visitedMap.size === matrix.length ** 2 || toProcess.length === 0)) {
    const newCells = [];

    for (const { i, j } of toProcess) {
      // toProcess.shift();
      const str = `${i}:${j}`;
      if (visitedMap.has(str)) {
        continue;
      } else {
        visitedMap.set(str, step);
      }

      const topCoords = [i, j + 1];
      const rightCoords = [i + 1, j];
      const bottomCoords = [i, j - 1];
      const leftCoords = [i - 1, j];

      for (const [newI, newJ] of [
        topCoords,
        rightCoords,
        bottomCoords,
        leftCoords,
      ]) {
        const cell = matrix?.[newI]?.[newJ];
        if (cell === START || cell === GARDEN) {
          const key = { i: newI, j: newJ };
          newCells.push(key);
        }
      }
    }

    toProcess = [...newCells];

    step++;
  }

  return visitedMap;
};

export const getGardenSpots = (initialMatrix) => {
  const distanceToEdge = Math.floor(initialMatrix.length / 2);

  const side = initialMatrix.length;

  const visitedMap = getVisitedMap(initialMatrix);
  const visitedNodes = [...visitedMap.values()].filter((dist) => dist >= 0);

  const n = Math.floor((STEPS_COUNT - distanceToEdge) / side);

  const oddTilesNumber = (n + 1) ** 2;
  const eventTilesNumber = n ** 2;

  const oddCorners = visitedNodes.filter(
    (dist) => dist > distanceToEdge && dist % 2 === 1,
  ).length;

  const eventCorners = visitedNodes.filter(
    (dist) => dist > distanceToEdge && dist % 2 === 0,
  ).length;

  const odd = visitedNodes.filter((dist) => dist % 2 === 1).length;

  const even = visitedNodes.filter((dist) => dist % 2 === 0).length;

  return (
    oddTilesNumber * odd +
    eventTilesNumber * even -
    (n + 1) * oddCorners +
    n * eventCorners
  );
};
