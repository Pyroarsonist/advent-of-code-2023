import { DASH_SIGN, EQUAL_SIGN } from "./constants";
import { hash } from "./hash";

const BOX_LENGTH = 256;

const processDashSign = (boxes, string) => {
  const [label] = string.split(DASH_SIGN);
  const boxNum = hash(label);

  const box = boxes[boxNum];

  const newBox = box.filter((lens) => lens.label !== label);

  boxes[boxNum] = newBox;
};

const processEqualSign = (boxes, string) => {
  const split = string.split(EQUAL_SIGN);
  const label = split[0];
  const focalLength = +split[1];

  const boxNum = hash(label);

  const box = boxes[boxNum];

  const foundLens = box.find((lens) => lens.label === label);

  if (foundLens) {
    foundLens.focalLength = focalLength;
  } else {
    box.push({
      label,
      focalLength,
    });
  }
};

const getSum = (boxes) => {
  let sum = 0;
  for (let i = 0; i < boxes.length; i++) {
    const box = boxes[i];

    const s = box.reduce(
      (acc, lens, j) => acc + (i + 1) * lens.focalLength * (j + 1),
      0,
    );

    sum += s;
  }
  return sum;
};

export const focalPower = (strings) => {
  const boxes = new Array(BOX_LENGTH).fill().map(() => []);

  for (const string of strings) {
    if (string.includes(DASH_SIGN)) {
      processDashSign(boxes, string);
    } else if (string.includes(EQUAL_SIGN)) {
      processEqualSign(boxes, string);
    }
  }

  return getSum(boxes);
};
