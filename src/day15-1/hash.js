export const hash = (string) => {
  let val = 0;
  for (let i = 0; i < string.length; i++) {
    const ascii = string.charCodeAt(i);
    val += ascii;
    val *= 17;
    val %= 256;
  }

  return val;
};
