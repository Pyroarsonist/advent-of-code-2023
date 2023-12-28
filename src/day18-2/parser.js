import { Directions } from "./constants";

const mapper = {
  0: Directions.right,
  1: Directions.bottom,
  2: Directions.left,
  3: Directions.top,
};

export const parser = (schema) => {
  const lines = schema.split("\n");

  return lines.map((line) => {
    const r = /(?<direction>.) (?<meters>\d+) \(#(?<rgb>.+)\)/g;
    const {
      groups: { rgb },
    } = r.exec(line);
    const direction = mapper[rgb.slice(5)];
    const meters = Number.parseInt(rgb.slice(0, 5), 16);

    return {
      direction,
      meters,
    };
  });
};
