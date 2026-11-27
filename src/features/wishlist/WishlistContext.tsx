import { createContext, useContext, type ReactNode } from 'react';
import { usePersistentState } from '../../hooks/usePersistentState';
import { findProduct } from '../../data/products';

interface WishlistState {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  count: number;
}

const Context = createContext<WishlistState | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = usePersistentState<string[]>(
    'dss-wishlist-v1',
    [],
    (v): v is string[] =>
      Array.isArray(v) && v.every((item) => typeof item === 'string' && !!findProduct(item)),
  );
  const toggle = (id: string) =>
    setIds((current) =>
      current.includes(id) ? current.filter((i) => i !== id) : [...current, id],
    );
  return (
    <Context.Provider value={{ ids, toggle, has: (id) => ids.includes(id), count: ids.length }}>
      {children}
    </Context.Provider>
  );
}

export function useWishlist() {
  const value = useContext(Context);
  if (!value) throw new Error('WishlistProvider is required');
  return value;
}
