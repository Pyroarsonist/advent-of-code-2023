export const lookup = ({ instruction, map }) => {
  const nextValue = (currentInstruction, value) =>
    currentInstruction === "R" ? map[value].right : map[value].left;

  let steps = 0;

  let currentValue = "AAA";

  let currentInstructionIndex = 0;

  while (currentValue !== "ZZZ") {
    const currentInstruction = instruction[currentInstructionIndex];
    currentValue = nextValue(currentInstruction, currentValue);

    currentInstructionIndex =
      (currentInstructionIndex + 1) % instruction.length;
    steps++;
  }

  return steps;
};
