const parsePart = (line) => {
  const text = line.slice(1, line.length - 1);
  const groups = text.split(",");
  return Object.fromEntries(
    groups.map((group) => {
      const [category, val] = group.split("=");

      return [category, +val];
    }),
  );
};

const parseWorkflow = (line) => {
  const [name, rest] = line.split("{");

  const text = rest.slice(0, rest.length - 1);
  const groups = text.split(",");
  return {
    name,
    rules: groups.map((group) => {
      if (group.includes("<") || group.includes(">")) {
        const r = /(?<category>.)(?<sign>[><])(?<value>\d+):(?<path>.+)/g;
        const groupsResult = r.exec(group).groups;
        return {
          category: groupsResult.category,
          sign: groupsResult.sign,
          value: +groupsResult.value,
          path: groupsResult.path,
          simple: false,
        };
      }

      return { path: group, simple: true };
    }),
  };
};

export const parser = (schema) => {
  const lines = schema.split("\n");

  const workflows = [];
  const parts = [];

  for (const line of lines) {
    if (line[0] === "{") {
      parts.push(parsePart(line));
    } else if (line[0]) {
      workflows.push(parseWorkflow(line));
    }
  }

  return {
    workflows,
    parts,
  };
};
