import { Link, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ArrowUpRight } from 'lucide-react';
import { products, categoryLabels } from '../data/products';
import { activities } from '../data/activities';
import { useWishlist } from '../features/wishlist/WishlistContext';
import { usePreferences } from '../app/Preferences';
import { filterProducts } from '../features/catalog/filterProducts';
import { ProductCard } from '../components/ProductCard';
import './Shop.css';

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const { language, currency, t } = usePreferences();
  const category = params.get('category') ?? '';
  const query = params.get('q') ?? '';
  const color = params.get('color') ?? '';
  const sort = params.get('sort') ?? 'featured';
  const activity = activities[params.get('activity') ?? ''];
  const { has } = useWishlist();
  const favorites = params.get('favorites') === '1';
  const update = (key: string, value: string) =>
    setParams(
      (current) => {
        const next = new URLSearchParams(current);
        value ? next.set(key, value) : next.delete(key);
        return next;
      },
      { replace: true },
    );
  const source = products.filter(
    (p) => (!activity || activity.ids.includes(p.id)) && (!favorites || has(p.id)),
  );
  const filtered = filterProducts(source, { category, query, color, sort, currency, language });
  return (
    <>
      <section className="shop-intro">
        <div>
          <p className="breadcrumb">
            <Link to="/">{t('Inicio', 'Home')}</Link> / {t('Colección', 'Collection')}
          </p>
          <h1 className="display">
            {favorites
              ? t('TUS FAVORITOS.', 'YOUR FAVORITES.')
              : t('ENCUENTRA TU RITMO.', 'FIND YOUR PACE.')}
          </h1>
          <p>
            {t(
              'Tus esenciales. Infinitas ganas de moverte.',
              'Your essentials. Endless reasons to move.',
            )}
          </p>
        </div>
        <Link className="text-link" to="/showroom">
          {t('Ver los looks en el showroom', 'See the looks in the showroom')}{' '}
          <ArrowUpRight size={16} />
        </Link>
      </section>
      <section className="catalog-section" aria-label={t('Catálogo', 'Catalog')}>
        <div className="catalog-categories">
          <button className={!category ? 'selected' : ''} onClick={() => update('category', '')}>
            {t('Todo', 'All')}
          </button>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              className={category === key ? 'selected' : ''}
              key={key}
              onClick={() => update('category', key)}
            >
              {label[language]}
            </button>
          ))}
        </div>
        <div className="catalog-toolbar">
          <div className="catalog-search">
            <Search size={16} />
            <input
              aria-label={t('Buscar en la colección', 'Search the collection')}
              autoFocus={params.has('search')}
              placeholder={t('Buscar tu próxima prenda…', 'Find your next piece…')}
              value={query}
              onChange={(e) => update('q', e.target.value)}
            />
            {query && (
              <button
                aria-label={t('Borrar búsqueda', 'Clear search')}
                onClick={() => update('q', '')}
              >
                <X size={15} />
              </button>
            )}
          </div>
          <div className="catalog-controls">
            <SlidersHorizontal size={15} />
            <select
              aria-label={t('Filtrar por color', 'Filter by color')}
              value={color}
              onChange={(e) => update('color', e.target.value)}
            >
              <option value="">{t('Todos los colores', 'All colors')}</option>
              <option value="#161616">{t('Negro', 'Black')}</option>
              <option value="#efefeb">{t('Blanco', 'White')}</option>
              <option value="#505050">{t('Gris carbón', 'Charcoal')}</option>
              <option value="#b9b9b9">{t('Gris claro', 'Light gray')}</option>
            </select>
            <select
              aria-label={t('Ordenar productos', 'Sort products')}
              value={sort}
              onChange={(e) => update('sort', e.target.value)}
            >
              <option value="featured">{t('Destacados', 'Featured')}</option>
              <option value="price-asc">{t('Precio: menor a mayor', 'Price: low to high')}</option>
              <option value="price-desc">{t('Precio: mayor a menor', 'Price: high to low')}</option>
            </select>
          </div>
        </div>
        <div className="catalog-results">
          <span role="status">
            {filtered.length} {t('prendas', 'pieces')}
            {activity ? ` · ${activity.label[language]}` : ''}
          </span>
          {(query || color || category || activity || favorites) && (
            <button onClick={() => setParams({})}>
              {t('Limpiar filtros', 'Clear filters')} <X size={12} />
            </button>
          )}
        </div>
        {filtered.length ? (
          <div className="product-grid">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2>{t('Un nuevo punto de partida.', 'A fresh start.')}</h2>
            <p>
              {t(
                'No hay prendas con estos filtros. Prueba otra búsqueda.',
                'No pieces match these filters. Try a different search.',
              )}
            </p>
            <button className="button" onClick={() => setParams({})}>
              {t('Ver toda la colección', 'View the collection')}
            </button>
          </div>
        )}
      </section>
    </>
  );
}
