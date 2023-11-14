export const getMegaByte = (num) => {
  return num ? (Number(num) / 1000000).toFixed(3) : 0;
};
