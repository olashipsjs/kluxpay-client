import React from 'react';

const useLocalStorage = (storageKey: string = '') => {
  const [value, setValue] = React.useState(() => {
    try {
      return localStorage.getItem(storageKey);
    } catch {
      return null; // Handle errors (e.g., localStorage is not available)
    }
  });

  const save = React.useCallback(
    (newValue: string) => {
      try {
        setValue(newValue);
        localStorage.setItem(storageKey, newValue);
      } catch {
        console.error('Could not save to localStorage');
      }
    },
    [storageKey]
  );

  const clear = React.useCallback(() => {
    try {
      setValue(null);
      localStorage.removeItem(storageKey);
    } catch {
      console.error('Could not clear localStorage');
    }
  }, [storageKey]);

  return { save, clear, item: value };
};

export default useLocalStorage;
