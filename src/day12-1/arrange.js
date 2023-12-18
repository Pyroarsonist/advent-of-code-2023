import { DAMAGED_CELL, OPERATIONAL_CELL } from "./constants";

const getArrangesCount = (springs, initialGroups, damagedCellsIndexes) => {
  const arrangesLength = 2 ** damagedCellsIndexes.length;

  let count = 0;
  for (let i = 0; i < arrangesLength; i++) {
    const binary = i.toString(2);
    const str = binary.padStart(damagedCellsIndexes.length, "0");

    const chars = springs.split("");

    for (let j = 0; j < str.length; j++) {
      const c = str[j];
      const charIndex = damagedCellsIndexes[j];

      chars[charIndex] = c === "1" ? DAMAGED_CELL : OPERATIONAL_CELL;
    }

    const newStr = chars.join("");

    const trimmed = newStr.replace(/\.+/g, ".").replace(/^\.|\.$/g, "");

    const groups = trimmed
      .split(".")
      .map((s) => s.length)
      .join(",");

    if (groups === initialGroups) {
      count++;
    }
  }

  return count;
};

export const arrange = ({ springs, groupsStr }) => {
  const damagedCellsIndexes = [...springs.matchAll(/\?/g)].map(
    (match) => match.index,
  );

  const count = getArrangesCount(springs, groupsStr, damagedCellsIndexes);

  return count;
};
