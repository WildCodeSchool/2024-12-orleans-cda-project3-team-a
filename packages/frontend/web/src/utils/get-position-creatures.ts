export function getPositionCreatures(countCreatures: number, position: string) {
  if (countCreatures === 4) {
    switch (position) {
      case 'top-left':
        return 'absolute top-1/10 left-1/20';
      case 'top-right':
        return 'absolute top-1/10 left-17/20';
      case 'bottom-left':
        return 'absolute top-7/10 left-1/20';
      case 'bottom-right':
        return 'absolute top-7/10 left-17/20';
      case 'top-center':
        return 'absolute top-1/10 center';
      default:
        return '';
    }
  } else if (countCreatures === 6) {
    switch (position) {
      case 'top-left':
        return 'absolute top-5 left-1/20';
      case 'top-right':
        return 'absolute top-5 left-3/4';
      case 'bottom-left':
        return 'absolute top-60 left-1/20';
      case 'bottom-right':
        return 'absolute bottom-10 left-3/4';
      case 'top-center':
        return 'absolute top-5 center';
      default:
        return '';
    }
  }
}
