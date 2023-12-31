const parseHistory = (history) => {
  const newHistory = [];
  for (let i = 0; i < history.length - 1; i++) {
    const num = history[i + 1] - history[i];
    newHistory.push(num);
  }

  return newHistory;
};

const processHistory = (history) => {
  const histories = [history];

  let nums = [...history];

  while (!nums.every((num) => num === 0)) {
    nums = parseHistory(nums);

    histories.push(nums);
  }

  return histories;
};

const getExtrapolatedValue = (history) => {
  const processedHistories = processHistory(history);

  const reversedHistories = JSON.parse(
    JSON.stringify(processedHistories),
  ).toReversed();

  for (let i = 0; i < reversedHistories.length; i++) {
    const h = reversedHistories[i];

    const neighbourNumber = i === 0 ? 0 : h.at(0);
    const belowNumber = i === 0 ? 0 : reversedHistories[i - 1].at(0);

    const val = neighbourNumber - belowNumber;

    h.unshift(val);
  }

  return reversedHistories.at(-1).at(0);
};

export const parseOasis = (matrix) => matrix.map(getExtrapolatedValue);
