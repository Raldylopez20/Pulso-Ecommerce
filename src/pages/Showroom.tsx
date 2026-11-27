import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ShoppingBag } from 'lucide-react';
import { products } from '../data/products';
import { looks } from '../data/looks';
import { usePreferences } from '../app/Preferences';
import { useCart } from '../features/cart/CartContext';
import { useToast } from '../components/Toast';
import { ShowroomStage } from '../features/showroom/ShowroomStage';
import { LookRail } from '../features/showroom/LookRail';
import { OutfitPicker } from '../features/showroom/OutfitPicker';
import { SizePicker } from '../components/SizePicker';
import { ProductImage } from '../components/ProductImage';
import type { Size } from '../types/catalog';
import './Showroom.css';

export default function Showroom() {
  const [params, setParams] = useSearchParams();
  const { t, price, language } = usePreferences();
  const { dispatch, setOpen } = useCart();
  const { show } = useToast();
  const look = looks.find((item) => item.id === params.get('look')) ?? looks[0];
  const lookProducts = look.products.map((id) => products.find((p) => p.id === id)!);
  const product = lookProducts.find((item) => item.id === params.get('product')) ?? lookProducts[0];
  const [size, setSize] = useState<Size | null>(null);
  const [error, setError] = useState(false);
  const selectProduct = (id: string) => {
    setParams({ look: look.id, product: id }, { replace: true });
    setSize(null);
    setError(false);
  };
  const selectLook = (id: string) => {
    setParams({ look: id }, { replace: true });
    setSize(null);
    setError(false);
  };
  const step = (direction: number) => {
    const index = looks.indexOf(look);
    selectLook(looks[(index + direction + looks.length) % looks.length].id);
  };
  // Precarga solo los vecinos para que la interacción responda sin descargar todo al inicio.
  useEffect(() => {
    const index = looks.indexOf(look);
    [-1, 1].forEach((offset) => {
      const image = new Image();
      image.src = `${import.meta.env.BASE_URL}images/${looks[(index + offset + looks.length) % looks.length].image}.webp`;
    });
  }, [look]);
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
    <div className="showroom-page">
      <div className="showroom-topbar">
        <Link to="/shop">
          <ArrowLeft size={14} />
          {t('Volver a la colección', 'Back to the collection')}
        </Link>
        <span>
          {t('Selecciona un look. Descubre sus prendas.', 'Choose a look. Explore its pieces.')}
        </span>
      </div>
      <ShowroomStage
        look={look}
        totalLooks={looks.length}
        products={lookProducts}
        selected={product.id}
        onSelect={selectProduct}
        onPrevious={() => step(-1)}
        onNext={() => step(1)}
      />
      <OutfitPicker look={look} onSelect={selectLook} />
      <div className="showroom-purchase">
        <div className="showroom-selected-image">
          <ProductImage image={product.image} crop={product.crop} alt={product.name} />
        </div>
        <div className="showroom-selected-info">
          <Link to={`/product/${product.id}`}>
            {product.name} <ArrowUpRight size={13} />
          </Link>
          <span>
            {product.color[language]} · {price(product)}
          </span>
        </div>
        <SizePicker
          value={size}
          onChange={(value) => {
            setSize(value);
            setError(false);
          }}
        />
        <div className="showroom-add">
          <button className="button" onClick={add}>
            {t('Agregar a la bolsa', 'Add to bag')} <ShoppingBag size={15} />
          </button>
          {error && <span role="alert">{t('Selecciona tu talla.', 'Select your size.')}</span>}
        </div>
      </div>
      <LookRail looks={looks} selected={look.id} onSelect={selectLook} />
      <p className="showroom-footnote">
        {t(
          'Looks completos de la colección. Selecciona una tarjeta para comprar esa prenda. Las tallas no modifican la imagen.',
          'Complete collection looks. Select a card to shop that piece. Sizes do not change the image.',
        )}
      </p>
    </div>
  );
}
