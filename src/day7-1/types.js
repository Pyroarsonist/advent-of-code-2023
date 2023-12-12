const Types = {
  FIVE_OF_KIND: 7,
  FOUR_OF_KIND: 6,
  FULL_HOUSE: 5,
  THREE_OF_KIND: 4,
  TWO_PAIR: 3,
  ONE_PAIR: 2,
  HIGH_CARD: 1,
};

export const getType = (cards) => {
  const map = new Map();

  for (const card of cards) {
    map.set(card, (map.get(card) ?? 0) + 1);
  }
  const descValues = [...map.values()].sort((a, b) => b - a);

  const [first, second] = descValues;

  if (first === 5) {
    return Types.FIVE_OF_KIND;
  }

  if (first === 4) {
    return Types.FOUR_OF_KIND;
  }

  if (first === 3) {
    if (second === 2) return Types.FULL_HOUSE;

    return Types.THREE_OF_KIND;
  }

  if (first === 2) {
    if (second === 2) {
      return Types.TWO_PAIR;
    }

    return Types.ONE_PAIR;
  }

  return Types.HIGH_CARD;
};
