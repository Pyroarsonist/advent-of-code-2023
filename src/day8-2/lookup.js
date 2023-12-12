const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
const lcm = (a, b) => (a / gcd(a, b)) * b;
const lcmAll = (ns) => ns.reduce(lcm, 1);

export const lookup = ({ instruction, map }) => {
  const nextValue = (currentInstruction, value) =>
    currentInstruction === "R" ? map[value].right : map[value].left;

  const currentValues = Object.keys(map).filter((s) => s.at(-1) === "A");

  const getLoopNumbers = (initialValue) => {
    let currentValue = initialValue;
    let currentInstructionIndex = 0;
    let steps = 0;

    while (!(currentValue.at(-1) === "Z")) {
      const currentInstruction = instruction[currentInstructionIndex];

      currentValue = nextValue(currentInstruction, currentValue);
      currentInstructionIndex =
        (currentInstructionIndex + 1) % instruction.length;
      steps++;
    }

    return steps;
  };

  const loopNumbers = currentValues.map((v) => getLoopNumbers(v));

  return lcmAll(loopNumbers);
};
