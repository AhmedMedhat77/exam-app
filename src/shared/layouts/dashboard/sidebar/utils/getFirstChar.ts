export function getFirstChar(name?: string): string {
  if (!name) return '';
  const clean = name.trim();
  if (clean.length > 0) {
    return clean.charAt(0).toUpperCase();
  }

  return '';
}
