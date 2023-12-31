export const parser = (schema) => {
  const lines = schema.split("\n");

  return lines.map((line) => {
    const [cards, bid] = line.split(" ");

    return { cards, bid: +bid };
  });
};
