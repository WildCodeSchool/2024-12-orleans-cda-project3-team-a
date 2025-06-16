export function formatNumber(number: number) {
  if (typeof number !== 'number' || Number.isNaN(number)) {
    return;
  }

  const roundedFloor = (value: number) => Math.floor(value * 10) / 10;

  if (number >= 1_000_000_000 || number <= -1_000_000_000) {
    return roundedFloor(number / 1_000_000_000).toString() + 'B';
  }

  if (number >= 1_000_000 || number <= -1_000_000) {
    return roundedFloor(number / 1_000_000).toString() + 'M';
  }

  if (number >= 1_000 || number <= -1_000) {
    return roundedFloor(number / 1_000).toString() + 'K';
  }

  return number.toString();
}
