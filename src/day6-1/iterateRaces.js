const getWaysOfRace = (race) => {
  const { time, distance } = race;

  let ways = 0;
  for (let v = 1; v < time; v++) {
    const timeRemaining = time - v;
    const totalDistance = timeRemaining * v;

    if (totalDistance > distance) {
      ways++;
      continue;
    }

    if (ways !== 0) {
      break;
    }
  }

  return ways;
};

export const iterateRaces = (races) => races.map((r) => getWaysOfRace(r));
