const getVerticalRepresentation = (matrix) => {
  const arr = [];
  for (let j = 0; j < matrix[0].length; j++) {
    let str = "";

    for (let i = 0; i < matrix.length; i++) {
      const cell = matrix[i][j];

      str += cell;
    }

    arr.push(str);
  }

  return arr;
};

const getVerticalCount = (matrix) => {
  const representation = getVerticalRepresentation(matrix);
  for (let y = 1; y < representation.length; y++) {
    const leftNum = y;
    const rightNum = matrix[0].length - y;
    const min = Math.min(leftNum, rightNum);
    let suitable = true;

    for (let i = 0; i < min; i++) {
      const leftVal = representation[y - i - 1];
      const rightVal = representation[y + i];
      if (leftVal !== rightVal) {
        suitable = false;
        break;
      }
    }

    if (suitable) {
      return y;
    }
  }

  return 0;
};

const transposeMatrix = (_matrix) => {
  const matrix = [];
  /* 0,0 0,1 0,2
     1,0 1,1 1,2
          =>
     0,2 1,2
     0,1 1,1
     0,0 1,0
*/

  for (let j = _matrix[0].length - 1; j !== -1; j--) {
    matrix[j] = [];
    for (let i = 0; i < _matrix.length; i++) {
      matrix[j][i] = _matrix[i][j];
    }
  }

  return matrix;
};

const getHorizontalCount = (matrix) =>
  getVerticalCount(transposeMatrix(matrix));

export const mirror = (matrix) => {
  const verticalCount = getVerticalCount(matrix);
  const horizontalCount = verticalCount === 0 ? getHorizontalCount(matrix) : 0;

  return { verticalCount, horizontalCount };
};
