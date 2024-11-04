export function formatDate(date: string | Date): string {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 7) {
    return d.toLocaleDateString('fr-CH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } else if (days > 0) {
    return `il y a ${days} jour${days > 1 ? 's' : ''}`;
  } else if (hours > 0) {
    return `il y a ${hours} heure${hours > 1 ? 's' : ''}`;
  } else if (minutes > 0) {
    return `il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
  } else {
    return 'à l\'instant';
  }
}