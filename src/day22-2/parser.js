const parseCoordinate = (coordinate) => {
  const [x, y, z] = coordinate.split(",");

  return { x: +x, y: +y, z: +z };
};

export const parser = (schema) => {
  const lines = schema.split("\n");

  return lines.map((line, i) => ({
    id: i + 1,
    coordinates: line
      .split("~")
      .map((coordinate) => parseCoordinate(coordinate)),
  }));
};
