import { useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved === null ? initialValue : JSON.parse(saved);
    } catch {
      return initialValue;
    }
  });

  function update(next) {
    setValue(next);
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {
      /* almacenamiento no disponible */
    }
  }

  return [value, update];
}
