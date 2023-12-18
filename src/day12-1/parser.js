export const parser = (schema) => {
  const lines = schema.split("\n");

  return lines.map((line) => {
    const [springs, groups] = line.split(" ");

    return {
      springs,
      groups: groups.split(",").map(Number),
      groupsStr: groups,
    };
  });
};
