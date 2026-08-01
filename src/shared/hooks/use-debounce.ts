import { useEffect, useState } from 'react';

/**
 * useDebounce Hook
 *
 * @param value - Value to debounce
 * @param delay - Delay in milliseconds
 * default - 300ms
 * @returns Debounced value
 */
export function useDebounce(value: string, delay?: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  const defaultDelay = 300;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay ?? defaultDelay);

    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}
