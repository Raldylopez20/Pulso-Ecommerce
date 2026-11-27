import { describe, expect, it } from 'vitest';
import { cartReducer, isCart } from './cartModel';

describe('Bolsa y persistencia', () => {
  it('agrupa la misma talla y mantiene distintas tallas separadas', () => {
    const first = cartReducer([], { type: 'add', productId: 'core-tee', size: 'M' });
    const second = cartReducer(first, { type: 'add', productId: 'core-tee', size: 'M' });
    const third = cartReducer(second, { type: 'add', productId: 'core-tee', size: 'L' });
    expect(third.map((line) => line.quantity)).toEqual([2, 1]);
    expect(first[0].quantity).toBe(1);
  });
  it('valida almacenamiento corrupto, productos inexistentes y cantidades fuera de rango', () => {
    expect(isCart([{ productId: 'deleted', size: 'M', quantity: 1 }])).toBeFalsy();
    expect(isCart([{ productId: 'core-tee', size: 'M', quantity: -2 }])).toBeFalsy();
    expect(isCart({ cart: [] })).toBeFalsy();
    expect(isCart([{ productId: 'core-tee', size: 'M', quantity: 1 }])).toBeTruthy();
    expect(cartReducer([], { type: 'add', productId: 'unknown', size: 'M' })).toEqual([]);
  });
  it('limita unidades y elimina únicamente la variante seleccionada', () => {
    let cart = cartReducer([], { type: 'add', productId: 'core-tee', size: 'M' });
    cart = cartReducer(cart, { type: 'quantity', productId: 'core-tee', size: 'M', quantity: 999 });
    expect(cart[0].quantity).toBe(10);
    cart = cartReducer(cart, { type: 'add', productId: 'core-tee', size: 'L' });
    expect(cartReducer(cart, { type: 'remove', productId: 'core-tee', size: 'M' })).toEqual([
      { productId: 'core-tee', size: 'L', quantity: 1 },
    ]);
  });
});
