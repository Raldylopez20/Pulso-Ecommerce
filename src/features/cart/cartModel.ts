import { findProduct } from '../../data/products';
import { sizes, type Size } from '../../types/catalog';
export interface CartLine {
  productId: string;
  size: Size;
  quantity: number;
}
export type CartAction =
  | { type: 'add'; productId: string; size: Size }
  | { type: 'quantity'; productId: string; size: Size; quantity: number }
  | { type: 'remove'; productId: string; size: Size }
  | { type: 'clear' };

// Las variantes se identifican por producto y talla; nunca se mezclan dos tallas.
export function cartReducer(lines: CartLine[], action: CartAction): CartLine[] {
  if (action.type === 'clear') return [];
  if (!findProduct(action.productId) || !sizes.includes(action.size)) return lines;
  const matches = (line: CartLine) =>
    line.productId === action.productId && line.size === action.size;
  if (action.type === 'remove') return lines.filter((line) => !matches(line));
  if (action.type === 'quantity') {
    if (!Number.isFinite(action.quantity)) return lines;
    return lines.map((line) =>
      matches(line)
        ? { ...line, quantity: Math.max(1, Math.min(10, Math.floor(action.quantity))) }
        : line,
    );
  }
  if (lines.some(matches))
    return lines.map((line) =>
      matches(line) ? { ...line, quantity: Math.min(10, line.quantity + 1) } : line,
    );
  return [...lines, { productId: action.productId, size: action.size, quantity: 1 }];
}
export function isCart(value: unknown): value is CartLine[] {
  return (
    Array.isArray(value) &&
    value.every(
      (line) =>
        line &&
        typeof line === 'object' &&
        findProduct(line.productId) &&
        sizes.includes(line.size) &&
        Number.isInteger(line.quantity) &&
        line.quantity > 0 &&
        line.quantity <= 10,
    )
  );
}
