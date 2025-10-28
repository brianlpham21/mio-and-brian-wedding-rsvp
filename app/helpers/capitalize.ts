export function capitalizeWords(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .filter((word) => word.length > 0)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}
