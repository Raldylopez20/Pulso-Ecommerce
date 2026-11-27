import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, Check } from 'lucide-react';
import { useCart } from './CartContext';
import { findProduct } from '../../data/products';
import { usePreferences } from '../../app/Preferences';
import { Modal } from '../../components/Modal';
import { ProductImage } from '../../components/ProductImage';
import './CartDrawer.css';

export function CartDrawer() {
  const { lines, dispatch, open, setOpen, count } = useCart();
  const { t, language, currency, money } = usePreferences();
  const [review, setReview] = useState(false);
  const close = () => {
    setOpen(false);
    setReview(false);
  };
  const total = lines.reduce(
    (sum, line) => sum + (findProduct(line.productId)?.price[currency] ?? 0) * line.quantity,
    0,
  );
  return (
    <Modal
      className="cart-drawer"
      open={open}
      onClose={close}
      title={`${t('Tu bolsa', 'Your bag')} (${count})`}
    >
      {!lines.length ? (
        <div className="cart-empty">
          <ShoppingBag size={42} strokeWidth={1} />
          <h3>{t('Tu próximo look te espera.', 'Your next look is waiting.')}</h3>
          <p>
            {t(
              'Descubre las prendas que se mueven contigo.',
              'Find the pieces that move with you.',
            )}
          </p>
          <Link className="button" to="/shop" onClick={close}>
            {t('Explorar colección', 'Explore collection')} <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-lines">
            {lines.map((line) => {
              const product = findProduct(line.productId)!;
              return (
                <article className="cart-line" key={`${line.productId}-${line.size}`}>
                  <Link className="cart-line-image" to={`/product/${product.id}`} onClick={close}>
                    <ProductImage image={product.image} crop={product.crop} alt={product.name} />
                  </Link>
                  <div className="cart-line-copy">
                    <Link to={`/product/${product.id}`} onClick={close}>
                      {product.name}
                    </Link>
                    <p>
                      {product.color[language]} / {t('Talla', 'Size')} {line.size}
                    </p>
                    <strong>{money(product.price[currency] * line.quantity)}</strong>
                    <div className="cart-line-actions">
                      <div className="quantity-control">
                        <button
                          aria-label={`${t('Reducir cantidad', 'Decrease quantity')} ${product.name}`}
                          disabled={line.quantity <= 1}
                          onClick={() =>
                            dispatch({ type: 'quantity', ...line, quantity: line.quantity - 1 })
                          }
                        >
                          <Minus size={13} />
                        </button>
                        <span>{line.quantity}</span>
                        <button
                          aria-label={`${t('Aumentar cantidad', 'Increase quantity')} ${product.name}`}
                          disabled={line.quantity >= 10}
                          onClick={() =>
                            dispatch({ type: 'quantity', ...line, quantity: line.quantity + 1 })
                          }
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <button
                        className="remove-item"
                        aria-label={`${t('Eliminar', 'Remove')} ${product.name} ${line.size}`}
                        onClick={() =>
                          dispatch({ type: 'remove', productId: line.productId, size: line.size })
                        }
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="cart-summary">
            <div>
              <span>{t('Subtotal', 'Subtotal')}</span>
              <strong>{money(total)}</strong>
            </div>
            <p>
              {t(
                'Precios de demostración. Sin gastos de envío ni cobros.',
                'Demo prices. No shipping charges or payments.',
              )}
            </p>
            {review ? (
              <div className="checkout-demo" role="status">
                <Check size={24} />
                <h3>{t('Tu selección está lista.', 'Your selection is ready.')}</h3>
                <p>
                  {t(
                    'Has llegado al final de la experiencia de compra. Esta tienda es una demo de DevStudio: no se ha realizado ningún pedido ni cobro.',
                    'You have reached the end of the shopping experience. This is a DevStudio demo: no order or payment has been made.',
                  )}
                </p>
                <button className="button" onClick={close}>
                  {t('Seguir explorando', 'Keep exploring')}
                </button>
              </div>
            ) : (
              <button className="button" onClick={() => setReview(true)}>
                {t('Revisar compra demo', 'Review demo purchase')} <ArrowRight size={17} />
              </button>
            )}
            <button className="cart-continue" onClick={close}>
              {t('Continuar explorando', 'Continue exploring')}
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}
