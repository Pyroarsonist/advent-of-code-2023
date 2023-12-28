import { PathMachine } from "./PathMachine";
import { INITIAL_PATH } from "./constants";

export const getSumRating = (workflows, parts) => {
  const machine = new PathMachine(workflows);

  const acceptedParts = parts.filter((part) =>
    machine.processPath(INITIAL_PATH, part),
  );

  let sum = 0;

  for (const part of acceptedParts) {
    for (const val of Object.values(part)) {
      sum += val;
    }
  }

  return sum;
};
