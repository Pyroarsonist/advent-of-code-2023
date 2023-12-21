export const parser = (schema) => {
  const lines = schema.split("\n");

  return lines.map((line) => line.split(""));
};
