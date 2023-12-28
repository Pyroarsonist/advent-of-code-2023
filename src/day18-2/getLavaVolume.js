import { Directions } from "./constants";

const move = ({ direction, meters }) => {
  let dx = 0;
  let dy = 0;
  if (direction === Directions.right) {
    dy += meters;
  } else if (direction === Directions.top) {
    dx -= meters;
  } else if (direction === Directions.bottom) {
    dx += meters;
  } else {
    dy -= meters;
  }

  return { dx, dy };
};

export const getLavaVolume = (digPlans) => {
  let x = 0;
  let y = 0;

  let area = 0;
  for (const plan of digPlans) {
    const { dx, dy } = move(plan);

    const newX = x + dx;
    const newY = y + dy;

    area += x * newY - y * newX + plan.meters;

    x = newX;
    y = newY;
  }

  let s = Math.abs(area) / 2 + 1;
  for (const plan of digPlans) {
    s += plan.meters;
  }

  return s;
};
