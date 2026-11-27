import { describe, expect, it } from 'vitest';
import { products } from '../../data/products';
import { looks } from '../../data/looks';
import { filterProducts, type CatalogFilters } from './filterProducts';
const defaults: CatalogFilters = {
  category: '',
  query: '',
  color: '',
  sort: 'featured',
  currency: 'DOP',
  language: 'es',
};

describe('Catálogo coherente con los looks', () => {
  it('incluye productos únicos y todos aparecen en el showroom', () => {
    expect(products).toHaveLength(13);
    expect(new Set(products.map((p) => p.id)).size).toBe(products.length);
    expect(looks).toHaveLength(11);
    for (const product of products)
      expect(looks.some((look) => look.products.includes(product.id))).toBe(true);
    for (const look of looks)
      for (const id of look.products)
        expect(products.some((product) => product.id === id)).toBe(true);
  });
  it('combina categoría, color y búsqueda sin modificar el original', () => {
    const original = products.map((p) => p.id);
    expect(
      filterProducts(products, { ...defaults, category: 'shorts', color: '#161616' }),
    ).toHaveLength(3);
    expect(filterProducts(products, { ...defaults, query: 'carbon' })).toHaveLength(2);
    expect(
      filterProducts(products, { ...defaults, category: 'shorts', query: 'no-existe' }),
    ).toHaveLength(0);
    filterProducts(products, { ...defaults, sort: 'price-desc' });
    expect(products.map((p) => p.id)).toEqual(original);
  });
  it('ordena por los precios de la moneda seleccionada', () => {
    const result = filterProducts(products, { ...defaults, sort: 'price-asc', currency: 'USD' });
    expect(result[0].id).toBe('motion-tank');
    expect(result.at(-1)?.id).toBe('taper-pant');
  });
});
