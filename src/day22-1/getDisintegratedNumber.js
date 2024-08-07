const MIN_Z = 1;

const getMinX = ({ coordinates }) => Math.min(...coordinates.map((c) => c.x));
const getMinY = ({ coordinates }) => Math.min(...coordinates.map((c) => c.y));
const getMinZ = ({ coordinates }) => Math.min(...coordinates.map((c) => c.z));
const getMaxX = ({ coordinates }) => Math.max(...coordinates.map((c) => c.x));
const getMaxY = ({ coordinates }) => Math.max(...coordinates.map((c) => c.y));
const getMaxZ = ({ coordinates }) => Math.max(...coordinates.map((c) => c.z));

const getSortedBricks = (bricks, usingMaxZ = false) =>
  bricks.toSorted((a, b) =>
    usingMaxZ ? getMaxZ(a) - getMaxZ(b) : getMinZ(a) - getMinZ(b),
  );

const overlap = (a, b) => {
  if (getMinX(a) > getMaxX(b)) return false;
  if (getMaxX(a) < getMinX(b)) return false;

  if (getMinY(a) > getMaxY(b)) return false;
  if (getMaxY(a) < getMinY(b)) return false;

  return true;
};

const fallToZ = (brick, z) => {
  const zDiff = getMaxZ(brick) - getMinZ(brick);

  const coordinates =
    brick.coordinates[0].z === getMinZ(brick)
      ? [
          { ...brick.coordinates[0], z },
          { ...brick.coordinates[1], z: z + zDiff },
        ]
      : [
          { ...brick.coordinates[0], z: z + zDiff },
          { ...brick.coordinates[1], z },
        ];

  return {
    ...brick,
    coordinates,
  };
};

const fall = (_bricks) => {
  const bricks = JSON.parse(JSON.stringify(_bricks));
  const stabilizedBricks = [];
  const newBricks = [];

  for (const brick of bricks) {
    if (getMinZ(brick) === MIN_Z) {
      stabilizedBricks.push(brick);
      newBricks.push(brick);
      continue;
    }

    let wasStabilized = false;
    let fallenBrick;

    for (const stabilizedBrick of getSortedBricks(
      stabilizedBricks,
      true,
    ).toReversed()) {
      const isOverlap = overlap(brick, stabilizedBrick);
      if (!isOverlap) continue;

      wasStabilized = true;
      const newZ = getMaxZ(stabilizedBrick) + 1;
      fallenBrick = fallToZ(brick, newZ);

      break;
    }

    if (!wasStabilized) {
      fallenBrick = fallToZ(brick, MIN_Z);
    }

    stabilizedBricks.push(fallenBrick);
    newBricks.push(fallenBrick);
  }

  return newBricks;
};

const linkBricks = (bricks) => {
  const linkSet = {};
  for (const brickBelow of bricks) {
    for (const topBrick of bricks) {
      if (brickBelow.id === topBrick.id) continue;
      linkSet[topBrick.id] ??= new Set();

      const onTopDiff1 = getMinZ(topBrick) === getMaxZ(brickBelow) + 1;

      if (!onTopDiff1) continue;

      if (overlap(brickBelow, topBrick)) {
        linkSet[topBrick.id].add(brickBelow.id);
      }
    }
  }

  return linkSet;
};

const getDisintegratedNumberFromLinkMap = (linkSet) => {
  const toDisintegrate = new Set(Object.keys(linkSet).map(Number));

  for (const linkedBricks of Object.values(linkSet)) {
    if (linkedBricks.size === 1) {
      const firstItem = [...linkedBricks.values()][0];
      toDisintegrate.delete(firstItem);
    }
  }

  return toDisintegrate.size;
};
export const getDisintegratedNumber = (bricks) => {
  const sortedBricks = getSortedBricks(bricks);
  const fallenBricks = getSortedBricks(fall(sortedBricks));
  const linkSet = linkBricks(fallenBricks);

  return getDisintegratedNumberFromLinkMap(linkSet);
};
