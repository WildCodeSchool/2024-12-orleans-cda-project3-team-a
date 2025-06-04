export function formatRemainingTime(comingDate: Date) {
  const now = new Date();
  const diff = comingDate.getTime() - now.getTime();

  if (diff <= 0) return 'Feed me !';

  const totalMins = Math.floor(diff / 1000 / 60);
  const days = Math.floor(totalMins / 1440);
  const hours = Math.floor((totalMins % 1440) / 60);
  const minutes = totalMins % 60;
  const seconds = Math.floor((diff / 1000) % 60);

  const remainingTime = [];
  if (days > 0) remainingTime.push(`${days} D`);
  if (hours > 0) remainingTime.push(`${hours} H`);
  if (minutes > 0 && days === 0) remainingTime.push(`${minutes} m`);
  //display seconds only if we are under 1 minute
  if (diff < 60000) remainingTime.push(`${seconds} s`);
  return ` ${remainingTime.join(' ')}`;
}
