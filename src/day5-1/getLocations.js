//   const maps = {
//     seeds: [],
//     seedToSoil: [],
//     soilToFertilizer: [],
//     fertilizerToWater: [],
//     waterToLight: [],
//     lightToTemperature: [],
//     temperatureToHumidity: [],
//     humidityToLocation: [],
//   };

const transformTargetFromSource = (sourceArr, transformMap) =>
  sourceArr.map((s) => {
    for (const { destination, source, range } of transformMap) {
      if (source <= s && s < source + range) {
        return s - source + destination;
      }
    }

    return s;
  });

export const getLocations = (maps) => {
  const soils = transformTargetFromSource(maps.seeds, maps.seedToSoil);
  const fertilizers = transformTargetFromSource(soils, maps.soilToFertilizer);
  const water = transformTargetFromSource(fertilizers, maps.fertilizerToWater);
  const light = transformTargetFromSource(water, maps.waterToLight);
  const temperature = transformTargetFromSource(light, maps.lightToTemperature);
  const humidity = transformTargetFromSource(
    temperature,
    maps.temperatureToHumidity,
  );
  const locations = transformTargetFromSource(
    humidity,
    maps.humidityToLocation,
  );

  return locations;
};
