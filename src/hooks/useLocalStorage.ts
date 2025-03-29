import { useState, useEffect } from 'react';
/**
 * A custom hook that provides local storage functionality with React state.
 *
 * @template T The type of the value to be stored
 * @param {string} key The key under which the value will be stored in localStorage
 * @param {T} initialValue The initial value to use if no value is found in localStorage
 * @returns {[T, (value: T | ((val: T) => T)) => void]} A tuple containing the stored value and a setter function
 *
 * The setter function can accept either a new value or a function that receives
 * the current value and returns a new value, similar to React's useState.
 */

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.error(error);
      return initialValue;
    }
  });

  // Update local storage when the state changes
  useEffect(() => {
    try {
      // Save state to local storage
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
