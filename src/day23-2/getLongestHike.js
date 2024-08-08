import { FOREST, START_TILE } from "./constants";

const convertMatrixToPathGraph = (matrix) => {
  const root = {};

  const variants = [{ x: START_TILE.x, y: START_TILE.y }];

  while (variants.length) {
    const variant = variants.shift();
    if (root?.[variant.x]?.[variant.y]) {
      continue;
    }

    const topCoords = [variant.x - 1, variant.y];
    const rightCoords = [variant.x, variant.y + 1];
    const bottomCoords = [variant.x + 1, variant.y];
    const leftCoords = [variant.x, variant.y - 1];

    const nextPositions = [topCoords, rightCoords, bottomCoords, leftCoords];

    const suitablePositions = nextPositions.filter(([x, y]) => {
      const nextCell = matrix?.[x]?.[y];

      return nextCell && nextCell !== FOREST;
    });

    for (const [x, y] of suitablePositions) {
      root[variant.x] ??= {};
      root[variant.x][variant.y] ??= [];

      root[variant.x][variant.y].push({ x, y });

      if (!root?.[x]?.[y]) {
        variants.push({ x, y });
      }
    }
  }
  return root;
};

const getInitialVisited = (graph) => {
  const visited = JSON.parse(JSON.stringify(graph));

  for (const x of Object.keys(visited)) {
    const yKeys = Object.keys(visited[x]);
    for (const y of yKeys) {
      visited[x][y] = false;
    }
  }

  return visited;
};

const getIntersections = (graph, END_TILE) => {
  const intersections = [{ ...START_TILE }, { ...END_TILE }];
  for (const x of Object.keys(graph)) {
    for (const y of Object.keys(graph[x])) {
      const neighbours = graph[x][y];

      if (neighbours.length > 2) {
        intersections.push({ x: +x, y: +y });
      }
    }
  }
  return intersections;
};

const getDistancesGraph = (pathGraph, intersections) => {
  let visited = {};

  const getDistance = (node, distance) => {
    for (const { x, y } of intersections) {
      if (x === node.x && y === node.y) {
        return [{ x, y }, distance];
      }
    }

    for (const neighbor of pathGraph[node.x][node.y]) {
      if (visited?.[neighbor.x]?.[neighbor.y]) {
        continue;
      }

      visited[node.x] ??= {};
      visited[node.x][node.y] = true;
      return getDistance(neighbor, distance + 1);
    }

    return [null, 0];
  };

  const distancesGraph = {};
  for (const { x, y } of intersections) {
    for (const neighbor of pathGraph[x][y]) {
      visited = { [x]: { [y]: true } };
      const [position, distance] = getDistance(neighbor, 1);

      distancesGraph[x] ??= {};
      distancesGraph[x][y] ??= [];

      if (position !== null) {
        distancesGraph[x][y].push({ position, distance });
      }
    }
  }

  return distancesGraph;
};

export const getLongestHike = (matrix) => {
  const END_TILE = { x: matrix.length - 1, y: matrix[0].length - 2 };

  const pathGraph = convertMatrixToPathGraph(matrix);
  const intersections = getIntersections(pathGraph, END_TILE);
  const distancesGraph = getDistancesGraph(pathGraph, intersections);

  const visited = getInitialVisited(pathGraph);
  let maxHike = -1;

  visited[START_TILE.x][START_TILE.y] = true;

  const hikeSearch = (variant) => {
    if (variant.x === END_TILE.x && variant.y === END_TILE.y) {
      maxHike = Math.max(maxHike, variant.step);
      return;
    }

    const points = distancesGraph[variant.x][variant.y];

    for (const { position, distance } of points) {
      if (visited[position.x][position.y]) {
        continue;
      }

      visited[position.x][position.y] = true;
      hikeSearch({
        step: variant.step + distance,
        x: position.x,
        y: position.y,
      });
      visited[position.x][position.y] = false;
    }
  };

  hikeSearch({ step: 0, x: START_TILE.x, y: START_TILE.y });

  return maxHike;
};
