export const parseMaps = (schema) => {
  const maps = {
    seeds: [],
    seedToSoil: [],
    soilToFertilizer: [],
    fertilizerToWater: [],
    waterToLight: [],
    lightToTemperature: [],
    temperatureToHumidity: [],
    humidityToLocation: [],
  };
  const lines = schema.split("\n");

  let arrayToPush = [];

  for (const line of lines) {
    if (line.includes("seeds:")) {
      const input = line
        .split("seeds:")[1]
        .split(" ")
        .filter(Boolean)
        .map(Number);

      const pairs = [];
      for (let i = 0; i < input.length; i += 2) {
        const [startNumber, range] = input.slice(i, i + 2);
        pairs.push({ startNumber, range });
      }

      maps.seeds.push(...pairs);
    } else if (line.includes("seed-to-soil")) {
      arrayToPush = maps.seedToSoil;
    } else if (line.includes("soil-to-fertilizer")) {
      arrayToPush = maps.soilToFertilizer;
    } else if (line.includes("fertilizer-to-water")) {
      arrayToPush = maps.fertilizerToWater;
    } else if (line.includes("water-to-light")) {
      arrayToPush = maps.waterToLight;
    } else if (line.includes("light-to-temperature")) {
      arrayToPush = maps.lightToTemperature;
    } else if (line.includes("temperature-to-humidity")) {
      arrayToPush = maps.temperatureToHumidity;
    } else if (line.includes("humidity-to-location")) {
      arrayToPush = maps.humidityToLocation;
    } else {
      const data = line.split(" ").filter(Boolean).map(Number);

      if (!data.length) continue;

      const [destination, source, range] = data;

      arrayToPush.push({
        destination,
        source,
        range,
      });
    }
  }

  return maps;
};
