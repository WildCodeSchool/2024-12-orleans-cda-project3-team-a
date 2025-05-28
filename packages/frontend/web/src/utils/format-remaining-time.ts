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
  if (days > 0) remainingTime.push(`${days} day${days > 1 ? 's' : ''}`);
  if (hours > 0) remainingTime.push(`${hours} hour${hours > 1 ? 's' : ''}`);
  if (minutes > 0 && days === 0)
    remainingTime.push(`${minutes} min${minutes > 1 ? 's' : ''}`);
  //display seconds only if we are under 1 minute
  if (diff < 60000)
    remainingTime.push(`${seconds} second${seconds !== 1 ? 's' : ''}`);
  return ` ${remainingTime.join(' ')}`;
}
