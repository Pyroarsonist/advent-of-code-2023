/**
 * @return {boolean} true if (x,y) is west of the line segment connecting A and B
 */
function west(A, B, x, y) {
  if (A.y <= B.y) {
    if (y <= A.y || y > B.y || (x >= A.x && x >= B.x)) {
      return false;
    }
    if (x < A.x && x < B.x) {
      return true;
    }
    return (y - A.y) / (x - A.x) > (B.y - A.y) / (B.x - A.x);
  }
  return west(B, A, x, y);
}
const rayCastingForBounds = (bounds, x, y) => {
  let count = 0;
  for (let b = 0; b < bounds.length; b++) {
    const vertex1 = bounds[b];
    const vertex2 = bounds[(b + 1) % bounds.length];
    if (west(vertex1, vertex2, x, y)) {
      ++count;
    }
  }
  return count % 2;
};

export const isInside = (bounds, x, y) => rayCastingForBounds(bounds, x, y);
