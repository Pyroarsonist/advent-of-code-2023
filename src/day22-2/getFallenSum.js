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
  const links = {};
  for (const brickBelow of bricks) {
    for (const topBrick of bricks) {
      if (brickBelow.id === topBrick.id) continue;
      links[topBrick.id] ??= { below: new Set(), above: new Set() };
      links[brickBelow.id] ??= { below: new Set(), above: new Set() };

      const onTopDiff1 = getMinZ(topBrick) === getMaxZ(brickBelow) + 1;

      if (!onTopDiff1) continue;

      if (overlap(brickBelow, topBrick)) {
        links[brickBelow.id].above.add(topBrick.id);
        links[topBrick.id].below.add(brickBelow.id);
      }
    }
  }

  return links;
};

const getFallenSumFromLinkMap = (initialLinks) => {
  const getFallenBricksNumber = (id, links, wouldFall) => {
    const { above } = links[id];
    const values = [...above.values()];

    if (values.length === 0) {
      return 0;
    }

    const wouldFallNow = [];

    for (const aboveID of values) {
      const { below } = links[aboveID];

      const belowWithoutFallen = below.difference(wouldFall);

      if (belowWithoutFallen.size === 1) {
        wouldFallNow.push(aboveID);
      }
    }

    let sum = 0;

    for (const wouldFallID of wouldFallNow) {
      if (wouldFall.has(wouldFallID)) continue;
      sum += 1 + getFallenBricksNumber(+wouldFallID, links, wouldFall);
      wouldFall.add(wouldFallID);
    }

    return sum;
  };

  let sum = 0;
  for (const number of Object.keys(initialLinks)) {
    sum += getFallenBricksNumber(+number, initialLinks, new Set());
  }

  return sum;
};

export const getFallenSum = (bricks) => {
  const sortedBricks = getSortedBricks(bricks);
  const fallenBricks = getSortedBricks(fall(sortedBricks));
  const links = linkBricks(fallenBricks);

  return getFallenSumFromLinkMap(links);
};
