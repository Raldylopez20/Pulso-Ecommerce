import { useEffect, useState } from 'react';

// Un almacenamiento bloqueado o un dato antiguo no debe impedir abrir la demo.
export function usePersistentState<T>(
  key: string,
  fallback: T,
  validate: (value: unknown) => value is T,
) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(key) ?? 'null');
      return validate(saved) ? saved : fallback;
    } catch {
      return fallback;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* La sesión sigue funcionando sin persistencia. */
    }
  }, [key, value]);
  return [value, setValue] as const;
}
