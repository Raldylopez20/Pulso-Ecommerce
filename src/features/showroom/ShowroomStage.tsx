import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Look, Product } from '../../types/catalog';
import { usePreferences } from '../../app/Preferences';
import { ProductImage } from '../../components/ProductImage';
import { useLookTransition } from '../../animations/useLookTransition';
import './ShowroomStage.css';

interface Props {
  look: Look;
  totalLooks: number;
  products: Product[];
  selected: string;
  onSelect: (id: string) => void;
  onPrevious: () => void;
  onNext: () => void;
}
export function ShowroomStage({
  look,
  totalLooks,
  products,
  selected,
  onSelect,
  onPrevious,
  onNext,
}: Props) {
  const { language, t, price } = usePreferences();
  const ref = useRef<HTMLDivElement>(null);
  const { displayed, incoming, failed } = useLookTransition(ref, look.image);
  return (
    <div className="showroom-stage" ref={ref}>
      <img
        className="showroom-backdrop"
        src={`${import.meta.env.BASE_URL}images/showroom-bg.webp`}
        alt=""
      />
      <div className="showroom-watermark" aria-hidden="true">
        PULSO
      </div>
      <img
        className="showroom-model"
        src={`${import.meta.env.BASE_URL}images/${displayed}.webp`}
        alt={`${t('Look deportivo', 'Athletic look')}: ${look.name}`}
      />
      {incoming && (
        <>
          <img
            className="showroom-model showroom-model--incoming"
            src={`${import.meta.env.BASE_URL}images/${incoming}.webp`}
            alt=""
            aria-hidden="true"
          />
          <div className="light-sweep" aria-hidden="true" />
        </>
      )}
      <div className="stage-caption">
        <span>{t('El movimiento empieza aquí.', 'Movement starts here.')}</span>
        <h1 className="display">SHOWROOM</h1>
      </div>
      <div className="stage-look-name">
        <span>
          {t('Look', 'Look')} {look.id} / {String(totalLooks).padStart(2, '0')}
        </span>
        <strong>{look.name}</strong>
      </div>
      <button
        className="stage-arrow stage-arrow--prev"
        onClick={onPrevious}
        aria-label={t('Look anterior', 'Previous look')}
      >
        <ChevronLeft size={20} />
      </button>
      <button
        className="stage-arrow stage-arrow--next"
        onClick={onNext}
        aria-label={t('Siguiente look', 'Next look')}
      >
        <ChevronRight size={20} />
      </button>
      {products.map((product, index) => (
        <button
          key={product.id}
          className={`floating-product floating-product--${index === 0 ? 'left' : 'right'} ${selected === product.id ? 'is-selected' : ''}`}
          onClick={() => onSelect(product.id)}
          aria-pressed={selected === product.id}
        >
          <div className="floating-product-photo">
            <ProductImage image={product.image} crop={product.crop} alt={product.name} />
          </div>
          <span>{product.name}</span>
          <small>
            {product.color[language]} · {price(product)}
          </small>
          <span className="floating-product-select">
            {selected === product.id ? t('Seleccionado', 'Selected') : t('Seleccionar', 'Select')}{' '}
            {selected === product.id ? '✓' : '+'}
          </span>
        </button>
      ))}
      {((displayed !== look.image && !incoming) || failed) && (
        <span className="look-loading" role="status">
          {failed
            ? t('No se pudo cargar este look.', 'This look could not load.')
            : t('Preparando tu look…', 'Preparing your look…')}
        </span>
      )}
    </div>
  );
}
