import { CONJUCTION_PREFIX, FLIP_FLOP_PREFIX } from "./constants";

const parseModule = (line) => {
  const text = line.slice(1);
  const divided = text.split("->");

  const name = divided[0].trim();
  const groups = divided[1].split(",").map((s) => s.trim());

  return {
    name,
    groups,
  };
};

export const parser = (schema) => {
  const lines = schema.split("\n");

  const flipFlops = [];
  const conjunctions = [];
  let broadcast;

  for (const line of lines) {
    if (line[0] === FLIP_FLOP_PREFIX) {
      flipFlops.push(parseModule(line, FLIP_FLOP_PREFIX));
    } else if (line[0] === CONJUCTION_PREFIX) {
      conjunctions.push(parseModule(line, CONJUCTION_PREFIX));
    } else if (line[0]) {
      const { groups } = parseModule(line);
      broadcast = groups;
    }
  }

  return {
    flipFlops,
    conjunctions,
    broadcast,
  };
};
