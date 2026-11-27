import { createContext, useContext, useState, type ReactNode } from 'react';
import { usePersistentState } from '../../hooks/usePersistentState';
import { cartReducer, isCart, type CartAction, type CartLine } from './cartModel';
interface CartState {
  lines: CartLine[];
  dispatch: (action: CartAction) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  count: number;
}
const Context = createContext<CartState | null>(null);
export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = usePersistentState<CartLine[]>('dss-cart-v1', [], isCart);
  const [open, setOpen] = useState(false);
  return (
    <Context.Provider
      value={{
        lines,
        dispatch: (action) => setLines((current) => cartReducer(current, action)),
        open,
        setOpen,
        count: lines.reduce((total, line) => total + line.quantity, 0),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useCart() {
  const value = useContext(Context);
  if (!value) throw new Error('CartProvider is required');
  return value;
}
