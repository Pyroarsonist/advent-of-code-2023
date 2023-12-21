export const parser = (schema) => {
  const lines = schema.split("\n");

  const matrices = [[]];

  for (const line of lines) {
    if (line === "") {
      matrices.push([]);
    } else {
      matrices.at(-1).push(line);
    }
  }

  return matrices;
};
