export const enclosuresCount = (totalEnclosures: number) => {
  return {
    isFour: totalEnclosures === 4,
    isSix: totalEnclosures === 6,
  };
};
