import { expandSpace } from "./expandSpace";

const getShortestDistance = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

const getShortestPathArr = (matrix, galaxies) => {
  const shortestPaths = [];

  for (const a of galaxies) {
    for (const b of galaxies) {
      if (a.id === b.id) {
        continue;
      }

      const pathExists = shortestPaths.some(
        (path) => path.ids.includes(a.id) && path.ids.includes(b.id),
      );

      if (pathExists) {
        continue;
      }

      const distance = getShortestDistance(a, b);

      shortestPaths.push({
        ids: [a.id, b.id],
        distance,
      });
    }
  }

  return shortestPaths;
};

export const getShortestPaths = (_matrix) => {
  const { matrix, galaxies } = expandSpace(_matrix);

  return getShortestPathArr(matrix, galaxies);
};
