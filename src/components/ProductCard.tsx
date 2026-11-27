import { Link } from 'react-router-dom';
import { ArrowUpRight, Heart, Plus } from 'lucide-react';
import type { Product } from '../types/catalog';
import { usePreferences } from '../app/Preferences';
import { useWishlist } from '../features/wishlist/WishlistContext';
import { useToast } from './Toast';
import { ProductImage } from './ProductImage';
import './ProductCard.css';

export function ProductCard({ product }: { product: Product }) {
  const { language, t, price } = usePreferences();
  const { toggle, has } = useWishlist();
  const { show } = useToast();
  const saved = has(product.id);
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggle(product.id);
    show(
      saved
        ? t('Eliminado de favoritos', 'Removed from favorites')
        : t('Guardado en favoritos', 'Saved to favorites'),
    );
  };
  return (
    <article className="product-card">
      <div className="product-card-figure">
        <Link
          className="product-card-image"
          to={`/product/${product.id}`}
          aria-label={product.name}
        >
          <ProductImage
            image={product.image}
            crop={product.crop}
            alt={`${product.name} · ${product.color[language]}`}
          />
          {product.featured && <span className="product-label">{t('Esencial', 'Essential')}</span>}
          <span className="product-card-plus">
            <Plus size={18} />
          </span>
          <span className="product-card-view">
            {t('Descubrir prenda', 'Explore product')} <ArrowUpRight size={15} />
          </span>
        </Link>
        <button
          className={`wishlist-btn${saved ? ' is-saved' : ''}`}
          onClick={handleWishlist}
          aria-label={
            saved
              ? t('Quitar de favoritos', 'Remove from favorites')
              : t('Guardar en favoritos', 'Save to favorites')
          }
          aria-pressed={saved}
        >
          <Heart size={15} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="product-card-info">
        <Link to={`/product/${product.id}`}>{product.name}</Link>
        <span>{price(product)}</span>
      </div>
      <p className="product-card-color">
        <i style={{ backgroundColor: product.colorHex }} />
        {product.color[language]} <span>· {product.fit[language]}</span>
      </p>
    </article>
  );
}
