export const parser = (schema) => {
  const races = [];
  const [timeLine, distanceLine] = schema.split("\n");

  const times = timeLine
    .split("Time:")[1]
    .split(" ")
    .filter(Boolean)
    .map(Number);

  const distances = distanceLine
    .split("Distance:")[1]
    .split(" ")
    .filter(Boolean)
    .map(Number);

  for (let i = 0; i < times.length; i++) {
    races.push({
      time: times[i],
      distance: distances[i],
    });
  }

  return races;
};
