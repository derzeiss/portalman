export const randint = (min: number, max?: number) => {
  if (max === undefined) {
    max = min;
    min = 0;
  }
  return Math.floor(Math.random() * (max - min) + min);
};
