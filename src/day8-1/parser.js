export const parser = (schema) => {
  const lines = schema.split("\n");

  const instruction = lines[0];

  return {
    instruction,
    map: lines
      .slice(2)
      .map((line) => {
        const r = /(?<root>.+) = \((?<left>.+), (?<right>.+)\)/gis;

        return { ...r.exec(line).groups };
      })
      .reduce((acc, item) => {
        acc[item.root] = { left: item.left, right: item.right };

        return acc;
      }, {}),
  };
};
