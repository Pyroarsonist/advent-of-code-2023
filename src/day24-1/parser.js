const parseHail = (line, id) => {
  const [positions, velocities] = line.split("@");
  const [x, y, z] = positions
    .split(",")
    .map((p) => p.trim())
    .map(Number);
  const [dx, dy, dz] = velocities
    .split(",")
    .map((v) => v.trim())
    .map(Number);
  return { id, x, y, z, dx, dy, dz };
};

export const parser = (schema) => {
  const lines = schema.split("\n");

  return lines.map((line, i) => parseHail(line, i + 1));
};
