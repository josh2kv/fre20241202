export function storeDataToLocalStorage<T = unknown>(
  key: string,
  data: T
): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export function retrieveDataFromLocalStorage<T = unknown>(
  key: string
): T | null {
  try {
    return JSON.parse(localStorage.getItem(key) ?? '') ?? null;
  } catch {
    console.log('Failed to retrieve data from localStorage');
    return null;
  }
}
