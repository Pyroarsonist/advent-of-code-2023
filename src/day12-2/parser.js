import { UNKNOWN_CELL } from "./constants";

const COPY_NUM = 5;

const createFunc = (text, delimiter) => {
  let str = "";
  for (let i = 0; i < COPY_NUM - 1; i++) {
    str += text;
    str += delimiter;
  }
  str += text;

  return str;
};

const createSprings = (springs) => createFunc(springs, UNKNOWN_CELL);
const createGroups = (groups) => createFunc(groups, ",");

export const parser = (schema) => {
  const lines = schema.split("\n");

  return lines.map((line) => {
    const [_springs, _groups] = line.split(" ");

    const springs = createSprings(_springs);
    const groups = createGroups(_groups);

    return {
      springs,
      groups: groups.split(",").map(Number),
      groupsStr: groups,
    };
  });
};
