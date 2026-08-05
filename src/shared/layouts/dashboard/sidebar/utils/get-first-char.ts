export function getFirstChar(value?: string): string {
  if (!value) return '';
  const clean = value.trim();
  if (clean.length > 0) {
    return clean.charAt(0).toUpperCase();
  }

  return '';
}
