// const maps = {
//   seeds: [[], []],
//   seedToSoil: [],
//   soilToFertilizer: [],
//   fertilizerToWater: [],
//   waterToLight: [],
//   lightToTemperature: [],
//   temperatureToHumidity: [],
//   humidityToLocation: [],
// };

const getRange = (from, to) => to - from + 1;

const transformTargetFromSource = (segments, transformMap) =>
  segments.flatMap((segment) => {
    const untransformedSegments = [{ ...segment, transform: false }];
    const processedSegments = [];

    for (let i = 0; i < untransformedSegments.length; i++) {
      const s = untransformedSegments[i];
      for (const { destination, source, range } of transformMap) {
        // s.startNumber .... s.startNumber+s.range-1 - from source
        // source .... source+range-1 - from transform map

        const sourceLeftPoint = s.startNumber;
        const sourceRightPoint = s.startNumber + s.range - 1;
        const targetLeftPoint = source;
        const targetRightPoint = source + range - 1;

        const noIntersection =
          sourceRightPoint < targetLeftPoint ||
          targetRightPoint < sourceLeftPoint;

        if (noIntersection) {
          continue;
        }

        const ranges = [];

        if (sourceLeftPoint <= targetLeftPoint) {
          if (sourceRightPoint <= targetRightPoint) {
            const leftDotsCoincide = sourceLeftPoint === targetLeftPoint;
            const r1 = {
              leftPoint: sourceLeftPoint,
              rightPoint: targetLeftPoint - 1,
              transform: false,
            };

            const r2 = {
              leftPoint: targetLeftPoint,
              rightPoint: sourceRightPoint,
              transform: true,
            };

            if (!leftDotsCoincide) {
              ranges.push(r1);
            }

            ranges.push(r2);
          } else {
            const leftDotsCoincide = sourceLeftPoint === targetLeftPoint;
            const rightDotsCoincide = sourceRightPoint === targetRightPoint;

            const r1 = {
              leftPoint: sourceLeftPoint,
              rightPoint: targetLeftPoint - 1,
              transform: false,
            };

            const r2 = {
              leftPoint: targetLeftPoint,
              rightPoint: targetRightPoint,
              transform: true,
            };

            const r3 = {
              leftPoint: targetRightPoint + 1,
              rightPoint: sourceRightPoint,
              transform: false,
            };

            if (!leftDotsCoincide) {
              ranges.push(r1);
            }

            ranges.push(r2);

            if (!rightDotsCoincide) {
              ranges.push(r3);
            }
          }
        } else if (sourceRightPoint <= targetRightPoint) {
          const r1 = {
            leftPoint: s.startNumber,
            rightPoint: s.startNumber + s.range - 1,
            transform: true,
          };
          ranges.push(r1);
        } else {
          const rightDotsCoincide = sourceRightPoint === targetRightPoint;

          const r1 = {
            leftPoint: sourceLeftPoint,
            rightPoint: targetRightPoint,
            transform: true,
          };

          const r2 = {
            leftPoint: targetRightPoint + 1,
            rightPoint: sourceRightPoint,
            transform: false,
          };
          ranges.push(r1);

          if (!rightDotsCoincide) {
            ranges.push(r2);
          }
        }

        const newSegments = ranges
          .filter((r) => r.transform)
          .map((r) => ({
            startNumber: r.leftPoint - source + destination,
            range: getRange(r.leftPoint, r.rightPoint),
          }));

        processedSegments.push(...newSegments);

        const notProcessedSegments = ranges
          .filter((r) => !r.transform)
          .map((r) => ({
            startNumber: r.leftPoint,
            range: getRange(r.leftPoint, r.rightPoint),
          }));

        untransformedSegments.push(...notProcessedSegments);
        s.processed = true;
      }
    }

    processedSegments.push(
      ...untransformedSegments
        .filter((s) => !s.processed)
        .map((s) => ({
          startNumber: s.startNumber,
          range: s.range,
        })),
    );

    return processedSegments;
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
