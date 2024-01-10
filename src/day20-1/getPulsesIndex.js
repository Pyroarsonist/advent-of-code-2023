import { PulseMachine } from "./PulseMachine";
import { TIMES } from "./constants";

export const getPulsesIndex = ({ flipFlops, conjunctions, broadcast }) => {
  const machine = new PulseMachine({ flipFlops, conjunctions, broadcast });

  machine.processPulses(TIMES);

  const { lowCount, highCount } = machine.getCounts();

  return lowCount * highCount;
};
