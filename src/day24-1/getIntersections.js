import { MAX_POS, MIN_POS } from "./constants";

const parallel = (aHail, bHail) => {
  const aDivision = aHail.dx / aHail.dy;
  const bDivision = bHail.dx / bHail.dy;
  return aDivision === bDivision;
};

const getNormalForm = ({ x, y, dx, dy }) => {
  // y = kx + b
  // k = dy / dx
  // b = y - xk

  const k = dy / dx;
  const b = y - x * k;

  return { k, b };
};

const intersect = (aHail, bHail) => {
  if (parallel(aHail, bHail)) return null;

  // y = kx + b
  // x = (b2 - b1) / (k1 - k2)

  const x = (bHail.b - aHail.b) / (aHail.k - bHail.k);
  const y = x * aHail.k + aHail.b;

  return { x, y };
};

const inRange = (num, min, max) => num >= min && num <= max;

const getInFuture = (aHail, bHail, x) => {
  // x = x0 + t*v
  // t = (x-x0)/v
  const tA = (x - aHail.x) / aHail.dx;
  const tB = (x - bHail.x) / bHail.dx;

  return tA > 0 && tB > 0;
};

export const getIntersections = (hails) => {
  const hailsWithNormalForm = hails.map((h) => ({
    ...h,
    ...getNormalForm(h),
  }));

  let count = 0;

  const visited = new Set();

  for (const aHail of hailsWithNormalForm) {
    for (const bHail of hailsWithNormalForm) {
      if (aHail.id === bHail.id) continue;
      const key = [aHail.id, bHail.id].sort().join(":");
      if (visited.has(key)) continue;
      visited.add(key);

      const intersections = intersect(aHail, bHail);

      if (!intersections) {
        continue;
      }

      const { x, y } = intersections;

      const inFuture = getInFuture(aHail, bHail, x);

      if (
        inFuture &&
        inRange(x, MIN_POS, MAX_POS) &&
        inRange(y, MIN_POS, MAX_POS)
      ) {
        count++;
      }
    }
  }

  return count;
};
