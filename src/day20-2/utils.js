const gcd = (a, b) => {
  if (!b) {
    return a;
  }
  return gcd(b, a % b);
};

const lcmTwoNumbers = (a, b) => Math.abs(a * b) / gcd(a, b);

export const lcm = (...numbers) =>
  numbers.reduce((acc, num) => lcmTwoNumbers(acc, num), 1);
