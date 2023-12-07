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
      maps.seeds.push(
        ...line.split("seeds:")[1].split(" ").filter(Boolean).map(Number),
      );
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
