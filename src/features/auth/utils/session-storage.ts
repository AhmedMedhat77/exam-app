export function handleSaveToSessionStorage(key: string, obj: unknown) {
  sessionStorage.setItem(key, JSON.stringify(obj));
}

export function handleGetFromSessionStorage<T>(key: string): T | null {
  const storedSession = sessionStorage.getItem(key);
  return storedSession ? JSON.parse(storedSession) : null;
}
