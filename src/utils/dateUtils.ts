export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-CH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}