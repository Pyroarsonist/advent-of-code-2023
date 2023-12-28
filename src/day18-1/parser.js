export const parser = (schema) => {
  const lines = schema.split("\n");

  return lines.map((line) => {
    const r = /(?<direction>.) (?<meters>\d+) \((?<rgb>.+)\)/g;
    const {
      groups: { direction, meters, rgb },
    } = r.exec(line);
    return {
      direction,
      meters: +meters,
      rgb,
    };
  });
};
