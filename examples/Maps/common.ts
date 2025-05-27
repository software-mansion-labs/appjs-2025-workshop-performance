const N = 1000;

export const MARKERS = [...new Array(N)].map(() => {
  const angle = Math.random() * 2 * Math.PI;
  const distance = Math.random() * 3;
  return {
    latitude: 52 + distance * Math.cos(angle),
    longitude: 19 + distance * Math.sin(angle) * 1.5,
  };
});
