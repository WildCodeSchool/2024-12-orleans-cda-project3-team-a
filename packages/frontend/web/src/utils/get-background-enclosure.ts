export function getBackgroundEnclosure(background: string) {
  switch (background) {
    case 'green':
      return 'bg-fairy-green';
    case 'blue':
      return 'bg-fairy-blue';
    case 'yellow':
      return 'bg-winged-yellow';
    case 'red':
      return 'bg-winged-red';
    case 'beige':
      return 'bg-mythologic-beige';
    case 'dark-beige':
      return 'bg-mythologic-dark-beige';
    case 'dark-green':
      return 'bg-shadow-green';
    case 'purple':
      return 'bg-shadow-purple';
  }
}
