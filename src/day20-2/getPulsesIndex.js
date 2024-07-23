import { PulseMachine } from "./PulseMachine";

export const getPulsesIndex = ({ flipFlops, conjunctions, broadcast }) => {
  const machine = new PulseMachine({ flipFlops, conjunctions, broadcast });

  const count = machine.processPulses();

  return count;
};
