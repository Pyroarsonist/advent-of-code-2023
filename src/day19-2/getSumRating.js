import { PathMachine } from "./PathMachine";

export const getSumRating = (workflows) => {
  const machine = new PathMachine(workflows);

  return machine.getSum();
};
