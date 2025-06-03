export function formatNumber(number: number) {
  const roundedDown = (value: number) => Math.floor(value * 10) / 10;

  if (number >= 1_000_000_000) {
    return roundedDown(number / 1_000_000_000).toString() + 'B';
  }

  if (number >= 1_000_000) {
    return roundedDown(number / 1_000_000).toString() + 'M';
  }

  if (number >= 1_000) {
    return roundedDown(number / 1_000).toString() + 'K';
  }

  return number.toString();
}
