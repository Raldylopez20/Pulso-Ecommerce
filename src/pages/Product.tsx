import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight, ShoppingBag, Ruler, Check } from 'lucide-react';
import { findProduct, products, categoryLabels } from '../data/products';
import { usePreferences } from '../app/Preferences';
import { useCart } from '../features/cart/CartContext';
import { useToast } from '../components/Toast';
import { ProductImage } from '../components/ProductImage';
import { ProductCard } from '../components/ProductCard';
import { SizePicker } from '../components/SizePicker';
import { Modal } from '../components/Modal';
import type { Size } from '../types/catalog';
import './Product.css';

export default function Product() {
  const { id } = useParams();
  const product = findProduct(id ?? '');
  const { t, language, price } = usePreferences();
  const { dispatch, setOpen } = useCart();
  const { show } = useToast();
  const [size, setSize] = useState<Size | null>(null);
  const [error, setError] = useState(false);
  const [guide, setGuide] = useState(false);
  const [view, setView] = useState<'detail' | 'full'>('detail');
  if (!product)
    return (
      <div className="empty-state">
        <h1>{t('Prenda no encontrada', 'Product not found')}</h1>
        <Link className="button" to="/shop">
          {t('Volver a la tienda', 'Back to shop')}
        </Link>
      </div>
    );
  const add = () => {
    if (!size) {
      setError(true);
      return;
    }
    dispatch({ type: 'add', productId: product.id, size });
    setOpen(true);
    show(t('Agregado a la bolsa', 'Added to bag'));
  };
  return (
    <>
      <div className="product-breadcrumb breadcrumb">
        <Link to="/">{t('Inicio', 'Home')}</Link> / <Link to="/shop">{t('Tienda', 'Shop')}</Link> /{' '}
        {product.name}
      </div>
      <section className="product-detail">
        <div className="product-gallery">
          <div className="product-gallery-main">
            <ProductImage
              image={product.image}
              crop={view === 'full' ? 'full' : product.crop}
              alt={product.name}
              eager
            />
          </div>
          <div className="gallery-tabs">
            <button aria-pressed={view === 'detail'} onClick={() => setView('detail')}>
              {t('La prenda', 'The piece')}
            </button>
            <button aria-pressed={view === 'full'} onClick={() => setView('full')}>
              {t('Look completo', 'Full look')}
            </button>
          </div>
        </div>
        <div className="product-details-copy">
          <Link className="product-category-link" to={`/shop?category=${product.category}`}>
            {categoryLabels[product.category][language]}
          </Link>
          <h1 className="display">{product.name}</h1>
          <p className="product-price">{price(product)}</p>
          <p className="product-description">{product.description[language]}</p>
          <div className="product-color-choice">
            <span>
              {t('Color', 'Color')}: <strong>{product.color[language]}</strong>
            </span>
            <i style={{ backgroundColor: product.colorHex }} aria-label={product.color[language]} />
          </div>
          <SizePicker
            value={size}
            onChange={(next) => {
              setSize(next);
              setError(false);
            }}
          />
          <button className="size-guide-link" onClick={() => setGuide(true)}>
            <Ruler size={15} /> {t('Guía de tallas', 'Size guide')}
          </button>
          {error && (
            <p className="size-error" role="alert">
              {t('Selecciona una talla para continuar.', 'Select a size to continue.')}
            </p>
          )}
          <button className="button add-to-bag" onClick={add}>
            {t('Agregar a la bolsa', 'Add to bag')} <ShoppingBag size={17} />
          </button>
          <Link
            className="button button--outline product-showroom"
            to={`/showroom?look=${product.lookId}&product=${product.id}`}
          >
            {t('Ver en el showroom', 'View in the showroom')} <ArrowUpRight size={17} />
          </Link>
          <div className="product-detail-meta">
            <span>
              <Check size={14} />
              {product.fit[language]}
            </span>
            <span>
              <Check size={14} />
              {t('Movimiento sin distracciones', 'Movement without distractions')}
            </span>
          </div>
          <details open>
            <summary>{t('Diseño y tejido', 'Design & fabric')}</summary>
            <p>{product.material[language]}</p>
          </details>
          <details>
            <summary>{t('Cuidado de la prenda', 'Garment care')}</summary>
            <p>
              {t(
                'Lavar con colores similares en frío. Secar al aire y evitar planchar sobre estampados.',
                'Wash cold with similar colors. Air dry and avoid ironing printed areas.',
              )}
            </p>
          </details>
          <details>
            <summary>{t('Sobre esta colección', 'About this collection')}</summary>
            <p>
              {t(
                'Colección conceptual de PULSO. Imágenes y precios de demostración; no se procesan pedidos ni pagos.',
                'PULSO concept collection. Demo images and prices; no orders or payments are processed.',
              )}
            </p>
          </details>
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <h2 className="display">{t('SIGUE EN MOVIMIENTO', 'KEEP MOVING')}</h2>
          <Link className="text-link" to="/shop">
            {t('Ver todo', 'View all')} <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="product-grid">
          {products
            .filter((p) => p.id !== product.id)
            .slice(0, 4)
            .map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
        </div>
      </section>
      <Modal open={guide} onClose={() => setGuide(false)} title={t('Guía de tallas', 'Size guide')}>
        <p>
          {t(
            'Medidas corporales orientativas en centímetros para esta colección ficticia.',
            'Indicative body measurements in centimeters for this fictional collection.',
          )}
        </p>
        <table>
          <thead>
            <tr>
              <th>{t('Talla', 'Size')}</th>
              <th>{t('Pecho', 'Chest')}</th>
              <th>{t('Cintura', 'Waist')}</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['S', '88–94', '72–78'],
              ['M', '95–101', '79–85'],
              ['L', '102–108', '86–92'],
              ['XL', '109–115', '93–99'],
            ].map((row) => (
              <tr key={row[0]}>
                {row.map((cell) => (
                  <td key={cell}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>
    </>
  );
}
