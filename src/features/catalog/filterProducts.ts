import type { Currency, Language, Product } from '../../types/catalog';
export interface CatalogFilters {
  category: string;
  query: string;
  color: string;
  sort: string;
  currency: Currency;
  language: Language;
}
const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

// Búsqueda y orden son funciones puras: no modifican el catálogo compartido.
export function filterProducts(products: Product[], filters: CatalogFilters) {
  const query = normalize(filters.query.trim());
  const filtered = products.filter(
    (product) =>
      (!filters.category || product.category === filters.category) &&
      (!filters.color || product.colorHex === filters.color) &&
      (!query ||
        normalize(
          `${product.name} ${product.description[filters.language]} ${product.color[filters.language]}`,
        ).includes(query)),
  );
  if (filters.sort === 'price-asc')
    filtered.sort((a, b) => a.price[filters.currency] - b.price[filters.currency]);
  if (filters.sort === 'price-desc')
    filtered.sort((a, b) => b.price[filters.currency] - a.price[filters.currency]);
  return filtered;
}
