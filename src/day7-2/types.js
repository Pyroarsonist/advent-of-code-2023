const Types = {
  FIVE_OF_KIND: 7,
  FOUR_OF_KIND: 6,
  FULL_HOUSE: 5,
  THREE_OF_KIND: 4,
  TWO_PAIR: 3,
  ONE_PAIR: 2,
  HIGH_CARD: 1,
};

const JOCKER_CARD = "J";

export const getType = (_cards) => {
  const cards = _cards.replaceAll(JOCKER_CARD, "");
  const jockerCount = _cards.length - cards.length;

  const map = new Map();

  for (const card of cards) {
    map.set(card, (map.get(card) ?? 0) + 1);
  }
  const descValues = [...map.values()].sort((a, b) => b - a);

  const first = descValues[0] ?? 0;
  const second = descValues[1] ?? 0;

  if (first + jockerCount === 5) {
    return Types.FIVE_OF_KIND;
  }

  if (first + jockerCount === 4) {
    return Types.FOUR_OF_KIND;
  }

  if (first + jockerCount === 3) {
    if (second === 2) return Types.FULL_HOUSE;

    return Types.THREE_OF_KIND;
  }

  if (first + jockerCount === 2) {
    if (second === 2) {
      return Types.TWO_PAIR;
    }

    return Types.ONE_PAIR;
  }

  return Types.HIGH_CARD;
};
