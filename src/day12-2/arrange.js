import { DAMAGED_CELL, OPERATIONAL_CELL } from "./constants";

const solveCoil = ({ springs, groups }) => {
  const n = springs.length;
  const m = groups.length;
  const p = Math.max(...groups);

  // dp[n][m][p]
  const dp = Array.from(
    {
      length: n + 1,
    },
    () =>
      Array.from(
        {
          length: m + 1,
        },
        () =>
          Array.from(
            {
              length: p + 1,
            },
            () => 0,
          ),
      ),
  );

  // base cases
  dp[0][0][0] = 1;
  let count = 0;
  for (let i = 1; i <= n; i++) {
    if (springs[i - 1] === DAMAGED_CELL) count++;
    else count = 0;
    if (count) dp[i][0][count] = 1;
  }
  for (let i = 1; i <= n; i++) {
    if (springs[i - 1] === DAMAGED_CELL) {
      break;
    } else dp[i][0][0] = 1;
  }

  // dp loop
  for (let i = 1; i <= n; i++) {
    if (springs[i - 1] === OPERATIONAL_CELL) {
      for (let j = 1; j <= m; j++) {
        dp[i][j][0] = dp[i - 1][j - 1][groups[j - 1]] + dp[i - 1][j][0];
      }
    } else if (springs[i - 1] === DAMAGED_CELL) {
      for (let j = 0; j <= m; j++) {
        for (let k = 0; k < p; k++) dp[i][j][k + 1] = dp[i - 1][j][k];
      }
    } else {
      // replacing with operational cell
      for (let j = 1; j <= m; j++) {
        dp[i][j][0] = dp[i - 1][j - 1][groups[j - 1]] + dp[i - 1][j][0];
      }

      // replacing with damaged cell
      for (let j = 0; j <= m; j++) {
        for (let k = 0; k < p; k++) dp[i][j][k + 1] = dp[i - 1][j][k];
      }
    }
  }

  return dp[n][m][0] + dp[n][m - 1][groups[m - 1]];
};

export const arrange = ({ springs, groupsStr, groups }) => {
  const count = solveCoil({ springs, groupsStr, groups });

  return count;
};
