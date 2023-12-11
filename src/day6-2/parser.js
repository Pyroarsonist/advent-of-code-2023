export const parser = (schema) => {
  const [timeLine, distanceLine] = schema.split("\n");

  const time = timeLine.split("Time:")[1].split(" ").filter(Boolean).join("");

  const distance = distanceLine
    .split("Distance:")[1]
    .split(" ")
    .filter(Boolean)
    .join("");

  return { time: +time, distance: +distance };
};
