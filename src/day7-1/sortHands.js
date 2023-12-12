import { getType } from "./types";

const addType = (hand) => {
  const type = getType(hand.cards);

  return {
    ...hand,
    type,
  };
};

const cardsValues = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const handsComparator = (a, b) => {
  if (a.type > b.type) return -1;
  if (a.type < b.type) return 1;

  for (let i = 0; i < a.cards.length; i++) {
    const aCard = a.cards[i];
    const bCard = b.cards[i];

    const aValue = cardsValues[aCard];
    const bValue = cardsValues[bCard];

    if (aValue > bValue) return -1;
    if (aValue < bValue) return 1;
  }

  return 0;
};

export const sortHands = (hands) => {
  const handsWithType = hands.map(addType);

  return [...handsWithType].sort(handsComparator);
};
